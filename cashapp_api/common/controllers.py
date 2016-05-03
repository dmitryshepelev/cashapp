from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.views.decorators.http import require_http_methods

from cashapp import settings
from cashapp.decorators import api_authorized, request_wrapper
from cashapp.libs.Message import Message
from cashapp.libs.Request import Request
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_api.server_errors import ServerErrorText
from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.PORegisterModel import PORegister
from cashapp_models.models.POTypeModel import POType
from cashapp_sett.forms.ManagePOForm import ManagePOForm


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_currency(request):
	"""
	Get list of available currencies
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	data = {'currencies': [currency.serialize() for currency in Currency.objects.all()]}
	return ServerResponse.ok(data=data)


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_po_types(request):
	"""
	Get list of available po types
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	data = {'types': [type.serialize() for type in POType.objects.all()]}
	return ServerResponse.ok(data=data)


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
@request_wrapper()
def manage_po(request, guid=None):
	"""
	Manage the payment objects depending on HTTP method
	GET: return already created PO
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
			payment_object = request.user.paymentobject_set.get(guid=guid)
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
		pass

	if request.is_PUT:
		po_guid = request.data.get('guid')

		po = PaymentObject.objects.get(guid=po_guid)



	if request.is_POST:
		form = ManagePOForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		po = PaymentObject(
			name = request.data.get('name'),
			allow_negative = request.data.get('allow_negative', False),
			currency_id = request.data.get('currency'),
			primary = request.data.get('primary', False),
			user = request.user,
			type_id = request.data.get('type')
		)
		po.save()

		return ServerResponse.created(data = {field_name: po.serialize()})


@require_http_methods(['GET'])
def manage_pers(request):
	"""
	Manage PERS
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		result = {}

		item_names = request.request.GET.get('i', '').split(',')

		for item_name in item_names:
			if item_name == 'widget':
				result[item_name] = []

				for widget in Widget.objects.filter(pers_id=request.user.pers.pk):
					result[item_name].append(widget.get_vm())

		return ServerResponse.ok(data=result)

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		pass


@require_http_methods(['POST', 'DELETE'])
def manage_widgets(request):
	"""
	Manage PERS
	:param request: HTTP request
	GET:
	DELETE: delete existing widget: Required params: guid. returns deleted widget guid
	PUT:
	POST: create new widget. Required params: guid, type. Returns created widget vm
	:return: ServerResponse instance
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		pass

	if request.is_DELETE:
		# Get request param
		guid = request.get('guid')

		if not guid:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		# Get widget to delete
		widget = Widget.objects.get(guid=guid)

		# Check if current user is owner of this widget
		if not widget.pers.user.pk == request.user.pk:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		widget.delete()
		return ServerResponse.ok(data={'guid': guid})

	if request.is_PUT:
		pass

	if request.is_POST:

		guid = request.data.get('guid')
		type = request.data.get('type')

		if not guid or not type:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		widget = Widget.objects.create(object_guid=guid, object_type=type, pers_id=request.user.pers.pk)

		return ServerResponse.created(data={'widget': widget.get_vm()})


@require_http_methods(['GET'])
def manage_register(request, po_guid):
	"""
	Manage po registers
	:param request:
	GET: returns register.
		Required params:
			p (period) = c - current: default|w - week|m - month|y - year;
			t (type) = current: default|expense|income
			If period is set as 'current' the current value is returned ignoring type
	:param po_guid: payment object guid
	:return: ServiceResponse
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		try:
			payment_object = PaymentObject.objects.get(guid=po_guid)

			if payment_object.user.pk != request.user.pk:
				raise ObjectDoesNotExist('User {u_id} is not an owner of {po_guid}'.format(u_id=request.user.pk, po_guid=payment_object.guid))

		except Exception as e:
			return ServerResponse.not_found(message=Message.error(e.message if settings.DEBUG else None))

		reg_period = request.request.GET.get('p', 'c')
		reg_type = request.request.GET.get('t', 'c')

		reg_params = PORegisterParams(reg_period, reg_type)

		result_item_name = 'register'
		result = {result_item_name: dict(owner=payment_object.guid, type=reg_params.reg_type, data=list())}

		query = Q() if reg_params.period == reg_params.Period.current else Q(Q(date__gte=reg_params.start_date), Q(date__lte=reg_params.end_date))
		query.add(Q(object_id=payment_object.guid), Q.AND)

		registers = PORegister.objects.filter(query)

		if reg_params.period == reg_params.Period.current:
			registers = [registers.latest('date')]

		for register in registers:
			result[result_item_name]['data'].append(register.get_vm())

		return ServerResponse.ok(data=result)