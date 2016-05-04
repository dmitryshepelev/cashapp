from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.CurrencyModel import Currency


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_currency(request):
	"""
	Get list of available currencies
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	data = {'currencies': [currency.serialize() for currency in Currency.objects.all()]}
	return ServerResponse.ok(data=data)