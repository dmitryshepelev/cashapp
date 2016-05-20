from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.SupplierModel import Supplier
from cashapp_my.forms.SupplierForm import SupplierForm


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST'])
@request_wrapper()
def manage_supplier(request, guid = None):
	"""
	Manage Supplier api method
	:param request: Http request
	GET:
	PUT:
	POST:
	:param guid:
	:return:
	"""
	field_name = 'supplier'

	if request.is_GET:

		if guid:
			try:
				supplier = request.user.supplier_set.get(guid = guid)
			except ObjectDoesNotExist as e:
				return ServerResponse.not_found(message = Message.error('The object {guid} is\'n found'.format(guid = guid)))

			return ServerResponse.ok(data = {field_name: supplier.serialize()})
		else:
			count = request.get_params.get('count', None)

			suppliers = Supplier.objects.filter(owner_id = request.user.pk).order_by('-creation_datetime')

			if count:
				suppliers = suppliers[:count:]

			return ServerResponse.ok(data = {field_name: [s.serialize() for s in suppliers]})

	if request.is_PUT:
		supplier_guid = request.data.get('guid', None)

		if not supplier_guid:
			return ServerResponse.bad_request(message = Message.error('Guid is not defined'))

		try:
			supplier = Supplier.objects.get(guid = supplier_guid, owner = request.user)
			supplier.update(request.data)
			supplier.save()
		except ObjectDoesNotExist as e:
			return ServerResponse.not_found(message = Message.error('The object {guid} is\'n found'.format(guid = supplier_guid)))

		except Exception as e:
			return ServerResponse.internal_server_error(message = Message.error('The error was occured during saving process'))

		return ServerResponse.ok(data = {field_name: supplier.serialize()})

	if request.is_POST:
		form = SupplierForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		supplier = Supplier(
			name = request.data.get('name'),
			description = request.data.get('description'),
			owner = request.user
		)

		try:
			supplier.save()
		except Exception as e:
			return ServerResponse.internal_server_error(message = Message.error('The error was occured during saving process'))

		return ServerResponse.created(data = {field_name: supplier.serialize()})