from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.exceptions.TransactionSaveError import TransactionSaveError
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
			return ServerResponse.bad_request(message = Message.error('Transaction type is not defined'))

		transaction = Transaction.create(transaction_type)
		transaction.set_data(status_id = TransactionStatus.objects.get_success_status().guid, user_id = request.user.pk, **request.data)

		try:
			transaction.full_clean()
			transaction.save()

		except ValidationError as e:
			message = {}
			if 'expense_items' in e.message_dict.keys():
				message = Message.error(e.message_dict.get('expense_items')[0])

			return ServerResponse.bad_request(message = message, data = e.message_dict)

		except TransactionSaveError as e:
			return ServerResponse.internal_server_error(message = Message.error(e.message))

		register_record = transaction.model.create_register_record()
		register_record.save()

		return ServerResponse.created(
			data = {field_name: transaction.model.__class__.objects.get(guid = transaction.model.guid).serialize()}
		)
