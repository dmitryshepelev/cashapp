from django.contrib import auth
from cashapp.classes.ServiceResultBase import ServiceResultBase


class ServiceResult(ServiceResultBase):
	"""
	Auth module service result class
	"""
	def __init__(self):
		super(ServiceResult, self).__init__()


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