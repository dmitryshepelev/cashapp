from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.ExpenseItemModel import ExpenseItem
from cashapp_my.forms.ExpenseItemForm import ExpenseItemForm


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST'])
@request_wrapper()
def manage_expense_item(request, guid = None):
	"""
	Manage Expense Items
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	field_name = 'expense_item'

	if request.is_GET:

		if guid:
			try:
				expense_item = request.user.expenseitem_set.get(guid = guid)
			except ObjectDoesNotExist as e:
				return ServerResponse.not_found(message = Message.error('The object {guid} is\'n found'.format(guid = guid)))

			return ServerResponse.ok(data = {field_name: expense_item.serialize()})

		else:
			count = request.get_params.get('count', None)

			expense_items = ExpenseItem.objects.filter(owner_id = request.user.pk).order_by('-creation_datetime')

			if count:
				expense_items = expense_items[:count:]

			return ServerResponse.ok(data = {field_name + 's': [item.serialize() for item in expense_items]})

	if request.is_PUT:
		expense_item_guid = request.data.get('guid', None)

		if not expense_item_guid:
			return ServerResponse.bad_request(message = Message.error('Guid is not defined'))

		try:
			expense_item = ExpenseItem.objects.get(guid = expense_item_guid, owner = request.user)
			expense_item.update(request.data)
			expense_item.save()
		except ObjectDoesNotExist as e:
			return ServerResponse.not_found(message = Message.error('The object {guid} is\'n found'.format(guid = expense_item_guid)))

		except Exception as e:
			return ServerResponse.internal_server_error(message = Message.error('The error was occured during saving process'))

		return ServerResponse.ok(data = {field_name: expense_item.serialize()})

	if request.is_POST:
		form = ExpenseItemForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		expense_item = ExpenseItem(
			name = request.data.get('name'),
			description = request.data.get('description'),
			category_id = request.data.get('category_id'),
			measure_id = request.data.get('measure_id'),
			currency_id = request.data.get('currency_id'),
			owner = request.user
		)

		try:
			expense_item.save()
		except Exception as e:
			return ServerResponse.internal_server_error(message = Message.error('The error was occured during saving process'))

		return ServerResponse.created(data = {field_name: expense_item.serialize()})
