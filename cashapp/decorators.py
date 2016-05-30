from functools import wraps

from decimal import Decimal
from django.http import HttpRequest
from django.utils.decorators import available_attrs

from cashapp.libs.Request import Request
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.exceptions.PaymentObjectLockedError import PaymentObjectLockedError
from cashapp_models.exceptions.PaymentObjectValueError import PaymentObjectValueError


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


def payment_object_permission():
	"""
	Check PO permission to execute transaction
	:return:
	"""
	def decorator(func):
		@wraps(func, assigned = available_attrs(func))
		def inner(transaction, *args, **kwargs):
			model = transaction.model

			payment_object = model.payment_object
			if not payment_object.is_locked:
				raise PaymentObjectLockedError('Payment object is locked')

			from cashapp_my.libs.Transaction import ExpenseTransaction
			if isinstance(transaction, ExpenseTransaction):
				value = transaction.get_total_value()
				register = model.payment_object.get_register_record(model.date)

				if not register or (not payment_object.allow_negative and Decimal(value) > register.value):
					raise PaymentObjectValueError(
						'Transaction total value is less than Payment object amount.'
						' Current Payment object doesn\'t allow negative values'
					)

			return func(transaction, *args, **kwargs)
		return inner
	return decorator
