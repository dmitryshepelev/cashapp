from django.http import JsonResponse


class ServerResponse(object):
	def __init__(self):
		pass

	@staticmethod
	def __resolve_data(data):
		"""
		Resolve data value
		:param data: data
		:return: empty object if the data is None
		"""
		return {} if not data else data

	@staticmethod
	def __resolve_message(message):
		"""
		Resolve message
		:param message: Message instance or None
		:return: Message instance
		"""
		return message or {}

	# 2xx
	@classmethod
	def ok(cls, data=None, message=None):
		"""
		Returns Success JsonResponse with 200 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		data = cls.__resolve_data(data)
		data.__setitem__('message', cls.__resolve_message(message))
		return JsonResponse(status=200, data=data)

	@classmethod
	def created(cls, data=None, message=None):
		"""
		Returns Success JsonResponse with 201 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		data = cls.__resolve_data(data)
		data.__setitem__('message', cls.__resolve_message(message))
		return JsonResponse(status=201, data=data)

	# 4xx
	@classmethod
	def bad_request(cls, data=None, message=None):
		"""
		Returns Error JsonResponse with 400 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		data = cls.__resolve_data(data)
		data.__setitem__('message', cls.__resolve_message(message))
		return JsonResponse(status=400, data=data)

	@classmethod
	def unauthorized(cls, data=None, message=None):
		"""
		Returns Error JsonResponse with 401 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		data = cls.__resolve_data(data)
		data.__setitem__('message', cls.__resolve_message(message))
		return JsonResponse(status=401, data=data)

	# 5xx
	@classmethod
	def internal_server_error(cls, data=None, message=None):
		"""
		Returns Error JsonResponse with 500 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		data = cls.__resolve_data(data)
		data.__setitem__('message', cls.__resolve_message(message))
		return JsonResponse(status=500, data=data)