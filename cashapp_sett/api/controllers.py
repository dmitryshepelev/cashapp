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