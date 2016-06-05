from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_po_register(request, guid):
	"""
	Manage the payment objects register on HTTP method
	GET:
	:param request: HTTP request
	:param guid: payment object guid
	:return: ServerResponse instance
	"""
	field_name = 'register'

	try:
		payment_object = request.user.paymentobject_set.get(guid=guid)
	except ObjectDoesNotExist as e:
		return ServerResponse.not_found(message=Message.error('The object {guid} is\'n found'.format(guid=guid)))

	last = request.get_params.get('last', False)

	if last:
		register_record = payment_object.get_last_register_record()
		return ServerResponse.ok({field_name: register_record.serialize() if register_record else {}})

	else:
		register_records = payment_object.get_aggregated_register_records()

		return ServerResponse.ok({field_name + 's': [record._asdict() for record in register_records]})
