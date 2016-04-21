from django.contrib import auth

from cashapp import settings
from cashapp.libs.Repository.UserRepository import UserRepository
from cashapp.libs.ServiceException import ServiceException
from cashapp.libs.ServiceResult import ServiceResult

user_repository = UserRepository()


def authenticate(username, password):
	"""
	Authenticate user
	:param username: user's name
	:param password: user's password
	:return: ServiceResponse instance
	"""
	result = ServiceResult()

	user = auth.authenticate(username = username, password = password)

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
		user = user_repository.create(username = username, email = email, password = password)

		auth_result = authenticate(username, password)

		if not auth_result.is_succeed:
			raise ServiceException(
				'Unable to authorize with \'{username}\' and \'{password}\''.format(username = username, password = password))

		result.data = auth_result.data
		return result

	except Exception as e:
		result.is_succeed = False
		result.message = e.message
		result.data = {'error': e.message if settings.DEBUG else 'Unable to sign up'}

	return result
