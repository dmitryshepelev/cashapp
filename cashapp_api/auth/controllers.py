from django.contrib.auth import login
from django.views.decorators.http import require_http_methods

from cashapp.libs.ServerResponse import ServerResponse
from cashapp_auth import services
from cashapp_auth.forms.SignInForm import SignInForm
from cashapp_auth.forms.SignUpForm import SignUpForm
from cashapp_auth.libs.RedirectResolver import RedirectResolver


@require_http_methods(['POST'])
def sign_up(request):
	"""
	Api method to create new user
	:param request: http request
	:return: ApiResponse instance
	"""
	data = request.body_data
	form = SignUpForm(data)

	if form.errors:
		return ServerResponse.bad_request(form.errors)

	signup_result = services.sign_up(form.data['username'], form.data['email'], form.data['password'])

	if not signup_result.is_succeed:
		return ServerResponse.internal_server_error(signup_result.data)

	auth_user = signup_result.data
	login(request, auth_user)

	resolver = RedirectResolver(request)

	return ServerResponse.ok(resolver.get_auth_redirect_url())


@require_http_methods(['POST'])
def sign_in(request):
	"""
	Api method to sign in user
	:param request: HTTP request
	:return: redirect url if user signed in succeed
	"""
	data = request.body_data
	form = SignInForm(data)

	if form.errors:
		return ServerResponse.bad_request(form.errors)

	auth_result = services.authenticate(form.data['username'], form.data['password'])

	if not auth_result.is_succeed:
		return ServerResponse.internal_server_error(auth_result.data)

	auth_user = auth_result.data
	login(request, auth_user)

	resolver = RedirectResolver(request)

	return ServerResponse.ok(resolver.get_auth_redirect_url())
