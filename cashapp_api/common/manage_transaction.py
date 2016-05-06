from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_my.libs.Transaction import Transaction


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
@request_wrapper()
def manage_transaction(request, transaction_type):
	"""
	Manage the transactions depending on HTTP method
	GET:
	DELETE:
	PUT:
	POST:
	:param request: HTTP request
	:param transaction_type: transaction type income|expense|transfer
	:return: ServerResponse instance
	"""
	field_name = 'transaction'

	if request.is_GET:
		pass

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		transaction = Transaction.create(transaction_type, request.data)
		form = transaction.form

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		model = transaction.create_model_instance(request.user)
		return ServerResponse.ok()
