from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_expense_item_register(request, guid):
	"""
	Manage the expense items register on HTTP method
	GET:
	:param request: HTTP request
	:param guid: expense item guid
	:return: ServerResponse instance
	"""
	field_name = 'register'

	try:
		expense_item = request.user.expenseitem_set.get(guid=guid)
	except ObjectDoesNotExist as e:
		return ServerResponse.not_found(message=Message.error('The object {guid} is\'n found'.format(guid=guid)))

	last = request.get_params.get('last', False)

	if last:
		register_record = expense_item.get_last_register_record()
		return ServerResponse.ok({field_name: register_record.serialize() if register_record else {}})

	else:
		raise NotImplementedError('Not implemented yet')
