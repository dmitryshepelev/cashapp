from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import api_authorized, request_wrapper
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.POModel import PaymentObject
from cashapp_my.forms.ManagePOForm import ManagePOForm


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
@request_wrapper()
def manage_po(request, guid=None):
	"""
	Manage the payment objects depending on HTTP method
	GET: return already created PO. if {guid} is defined returns 1 record
	DELETE:
	PUT:
	POST: create new PO
	:param request: HTTP request
	:param guid: payment object guid
	:return: ServerResponse instance
	"""
	field_name = 'po'

	if request.is_GET:
		if guid:
			# Get by guid
			try:
				payment_object = request.user.paymentobject_set.get(guid=guid)
			except ObjectDoesNotExist as e:
				return ServerResponse.not_found(message = 'The object {guid} is\'n found'.format(guid=guid))

			result = {field_name: payment_object.serialize()}

			return ServerResponse.ok(data=result)
		else:
			# Get all
			result = {field_name: []}
			payment_objects = request.user.paymentobject_set.all()

			for po in payment_objects:
				result[field_name].append(po.serialize())

			return ServerResponse.ok(data=result)

	if request.is_DELETE:
		return ServerResponse.bad_request()

	if request.is_PUT:
		po_guid = request.data.get('guid', None)

		if not po_guid:
			return ServerResponse.bad_request(message = 'Guid is not defined')

		try:
			po = PaymentObject.objects.get(guid=po_guid)
			po.update(request.data)
			po.save()
		except ObjectDoesNotExist as e:
			return ServerResponse.not_found(message = 'The object {guid} is\'n found'.format(guid=po_guid))
		except Exception as e:
			return ServerResponse.internal_server_error(message = 'The error was occured during saving process')

		return ServerResponse.ok(data = {field_name: po.serialize()})

	if request.is_POST:
		form = ManagePOForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		po = PaymentObject(
			name = request.data.get('name'),
			allow_negative = request.data.get('allow_negative', False),
			currency_id = request.data.get('currency_id'),
			primary = request.data.get('primary', False),
			user = request.user,
			type_id = request.data.get('type_id')
		)
		try:
			po.save()
		except Exception as e:
			return ServerResponse.internal_server_error(message = 'The error was occured during saving process')

		return ServerResponse.created(data = {field_name: po.serialize()})
