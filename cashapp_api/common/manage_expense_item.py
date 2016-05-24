from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.ExpenseItemModel import ExpenseItem
from cashapp_my.forms.ExpenseItemForm import ExpenseItemForm


@api_authorized()
@require_http_methods(['GET', 'POST'])
@request_wrapper()
def manage_expense_item(request):
	"""
	Manage Expense Items
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	field_name = 'expense_item'

	if request.is_GET:
		raise NotImplementedError()

	if request.is_POST:
		form = ExpenseItemForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		expense_item = ExpenseItem(
			name = request.data.get('name'),
			description = request.data.get('description'),
			category_id = request.data.get('category_id'),
			measure_id = request.data.get('measure_id'),
			supplier_id = request.data.get('supplier_id'),
			currency_id = request.data.get('currency_id'),
			owner = request.user
		)

		try:
			expense_item.save()
		except Exception as e:
			return ServerResponse.internal_server_error(message = Message.error('The error was occured during saving process'))

		return ServerResponse.created(data = {field_name: expense_item.serialize()})
