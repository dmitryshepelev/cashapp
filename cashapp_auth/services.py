import json
from django.contrib import auth
from cashapp import settings

from cashapp.classes.Repository.UserRepository import UserRepository
from cashapp.classes.ServiceException import ServiceException
from cashapp_auth.classes.ServiceResult import ServiceResult


user_repository = UserRepository()


def authenticate(username, password):
	"""
	Authenticate user
	:param username: user's name
	:param password: user's password
	:return: ServiceResponse instance
	"""
	result = ServiceResult()

	user = auth.authenticate(username=username, password=password)

	if user is None:
		result.is_succeed = False
		result.data = {
			'username': ['Invalid username or password'],
			'password': ['Invalid username or password']
		}
		return result

	result.data = user
	return result


def sign_up(username, email, password):
	"""
	Creates new user and sign in him
	:param username: username
	:param email: email
	:param password: password
	:return: ServiceResponse instance
	"""
	result = ServiceResult()

	try:
		user = user_repository.create(username=username, email=email, password=password)

		auth_result = authenticate(username, password)

		if not auth_result.is_succeed:
			raise ServiceException('Unable to authorize with \'{username}\' and \'{password}\''.format(username, password))

		result.data = auth_result.data
		return result

	except Exception as e:
		result.is_succeed = False
		result.message = e.message
		result.data = {'error': e.message if settings.DEBUG else 'Unable to sign up'}

	return result


def redirect_resolver(request):
	"""
	Resolve redirect url by request
	:param request: HTTP request
	:return: ServiceResponse instance
	"""
	result = ServiceResult()

	data = json.loads(request.body)
	redirect_url = data.get('redirect_url', None)

	result.data = {
		'redirect_url': redirect_url or ('/admin/' if request.user.is_superuser else ('/my/' if request.user.is_active else '/blocked/')) if request.user.is_authenticated() else '/auth/'
	}

	return result