from django.db import IntegrityError
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.Exceptions.TransactionSaveError import TransactionSaveError
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

		if not transaction.is_form_valid():
			return ServerResponse.bad_request(data = transaction.form.errors)

		try:
			model = transaction.create_model_instance(request.user)
			TransactionStatus.set_success(model)
			transaction.save_model()

		except IntegrityError as e:
			return ServerResponse.bad_request(message = Message.error('Paymnet object does not exist'))

		except TransactionSaveError as e:
			TransactionStatus.set_error(transaction.model_instance)
			transaction.model_instance.save()

			return ServerResponse.internal_server_error(message = Message.error(e.message))

		except Exception as e:
			return ServerResponse.bad_request(message = Message.error('Invalid POST data'))

		register_record = model.create_register_record()
		register_record.save()

		return ServerResponse.created(data={field_name: model.__class__.objects.get(guid=model.guid).serialize()})
