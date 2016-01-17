import json

from django.contrib.auth import login
from django.views.decorators.http import require_http_methods

from cashapp.classes.ServerResponse import ServerResponse
from cashapp_auth import services
from cashapp_auth.forms import SigninForm


@require_http_methods(['POST'])
def sign_up(request):
	"""
	Api method to create new user
	:param request: http request
	:return: ApiResponse instance
	"""
	return ServerResponse.ok(data='abv')


@require_http_methods(['POST'])
def sign_in(request):
	"""
	Api method to sign in user
	:param request: HTTP request
	:return: redirect url if user signed in succeed
	"""
	data = json.loads(request.body)
	form = SigninForm(data)

	if form.errors:
		return ServerResponse.bad_request(form.errors)

	auth_result = services.authenticate(form.data['username'], form.data['password'])

	if not auth_result.is_succeed:
		return ServerResponse.internal_server_error(auth_result.data)

	auth_user = auth_result.data
	login(request, auth_user)

	return ServerResponse.ok()