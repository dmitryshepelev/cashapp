from ast import literal_eval


class Request(object):
	"""
	Represents request data
	"""
	def __init__(self, request):
		"""
		Class constructor
		:param request: HTTP request
		"""
		self.__data = literal_eval(request.body) if request.body else dict()
		self.__request = request

	@property
	def data(self):
		"""
		Getter of __data
		:return: data value
		"""
		return self.__data

	@property
	def is_GET(self):
		"""
		Getter of __is_GET
		:return: is_GET value
		"""
		return self.__request.method == 'GET'

	@property
	def is_POST(self):
		"""
		Getter of __is_POST
		:return: is_POST value
		"""
		return self.__request.method == 'POST'

	@property
	def is_PUT(self):
		"""
		Getter of __is_PUT
		:return: is_PUT value
		"""
		return self.__request.method == 'PUT'

	@property
	def is_DELETE(self):
		"""
		Getter of __is_DELETE
		:return: is_DELETE value
		"""
		return self.__request.method == 'DELETE'

	@property
	def request(self):
		"""
		Getter of __request
		:return: request value
		"""
		return self.__request

	@property
	def user(self):
		"""
		Getter of __user
		:return: user value
		"""
		return self.__request.user

	def get(self, prop_name, default_type=dict):
		"""
		Returns a property of data if exist, else returns {}
		:param prop_name: name of the property to get
		:param default_type: if specified returns empty instance of return_type. Default - {}
		:return: {return_type} instance
		"""
		try:
			return self.__data.get(prop_name, default_type())
		except AttributeError as e:
			return default_type()