from ast import literal_eval
import json

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from cashapp.classes.ServerResponse import ServerResponse
from cashapp_sett import services


@login_required
@require_http_methods(['GET'])
def get_ui_tabs(request):
	"""
	Returns ui tabs depends on current user
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	user = request.user

	generate_tabs_result = services.generate_ui_tab_collection(user)

	return ServerResponse.ok(data=generate_tabs_result.data)


@login_required
@require_http_methods(['GET', 'POST'])
def manage_lang(request):
	"""
	Get or Set current language depends on request method
	:param request:  HTTP request
	:return: ServerResponse instance
	"""
	if request.method == 'GET':
		# get language
		return ServerResponse.ok(data=services.get_language().data)

	else:
		# set language
		data = json.loads(request.body)
		key = data.get('key')

		return ServerResponse.ok(data=services.set_language(key).data)


@login_required
@require_http_methods(['GET'])
def get_currencies(request):
	"""
	Get list of available currencies
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	return ServerResponse.ok(data=services.get_available_currencies().data)


@require_http_methods(['POST'])
def set_init_cash(request):
	"""
	Set initial cash
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	data = literal_eval(request.body)
	cards = data.get('cards', [])
	cashes = data.get('cashes', [])

	set_finance_result = services.set_finances(cards, cashes, request.user.pk)

	if not set_finance_result.is_succeed:
		return ServerResponse.internal_server_error(data=set_finance_result.data)

	return ServerResponse.ok(data=set_finance_result.data)