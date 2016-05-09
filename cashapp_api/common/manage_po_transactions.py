from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_po_transaction(request, guid):
	"""
	Gets po associated transactions
	:param request:
	:param guid: po guid
	:return:
	"""
	try:
		payment_object = request.user.paymentobject_set.get(guid=guid)
	except ObjectDoesNotExist as e:
		return ServerResponse.not_found(message=Message.error('The object {guid} is\'n found'.format(guid=guid)))

	transaction_type = request.get_params.get('type', None)
	count = request.get_params.get('count', None)

	transactions = IncomeTransaction.objects.get_po_associated(payment_object)

	return ServerResponse.ok(data={'transactions': [t.serialize() for t in transactions]})