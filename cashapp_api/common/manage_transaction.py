from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.TransactionStatusModel import TransactionStatus
from cashapp_my.libs.Transaction import Transaction


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
@request_wrapper()
def manage_transaction(request, transaction_type = None):
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
		return ServerResponse.ok()

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		if not transaction_type:
			return ServerResponse.bad_request(message=Message.error('Transaction type is not defined'))

		transaction = Transaction.create(transaction_type)
		transaction.data = request.data
		form = transaction.form

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		model = transaction.create_model_instance(request.user)
		TransactionStatus.set_success(model)
		model.save()

		register_record = model.payment_object.create_register_record(model)
		register_record.save()

		return ServerResponse.ok(data={field_name: model.serialize()})
