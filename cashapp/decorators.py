from functools import wraps

from django.http import HttpRequest
from django.utils.decorators import available_attrs

from cashapp.libs.Request import Request
from cashapp.libs.ServerResponse import ServerResponse


def api_authorized():
	"""
	Decorator to make a method only accept authorized request methods. Usage::

		@api_authorized()
		def my_view(request):
			# ...

	"""
	def decorator(func):
		@wraps(func, assigned=available_attrs(func))
		def inner(request, *args, **kwargs):
			if not request.user.is_authenticated():
				return ServerResponse.unauthorized()
			return func(request, *args, **kwargs)
		return inner
	return decorator


def request_wrapper():
	"""
	Wraps controller request arg into Request class
	:return:
	"""
	def decorator(func):
		@wraps(func, assigned = available_attrs(func))
		def inner(request, *args, **kwargs):
			if not isinstance(request, HttpRequest):
				raise TypeError('The first argument is not HttpRequest - {type}'.format(type=type(request)))

			request = Request(request)
			return func(request, *args, **kwargs)
		return inner
	return decorator
