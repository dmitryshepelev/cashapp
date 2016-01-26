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

	# 2xx
	@classmethod
	def ok(cls, data=None):
		"""
		Returns Success JsonResponse with 200 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		return JsonResponse(status=200, data=cls.__resolve_data(data))

	@classmethod
	def created(cls, data=None):
		"""
		Returns Success JsonResponse with 201 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		return JsonResponse(status=201, data=cls.__resolve_data(data))

	# 4xx
	@classmethod
	def bad_request(cls, data=None):
		"""
		Returns Error JsonResponse with 400 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		return JsonResponse(status=400, data=cls.__resolve_data(data))

	@classmethod
	def unauthorized(cls, data=None):
		"""
		Returns Error JsonResponse with 401 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		return JsonResponse(status=401, data=cls.__resolve_data(data))

	# 5xx
	@classmethod
	def internal_server_error(cls, data=None):
		"""
		Returns Error JsonResponse with 500 status code
		:param data: response content
		:return: JsonResponse instance
		"""
		return JsonResponse(status=500, data=cls.__resolve_data(data))