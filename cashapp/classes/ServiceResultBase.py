class ServiceResultBase(object):
	"""
	Service result class
	"""
	def __init__(self):
		self.__is_succeed = True
		self.__data = None
		self.__message = ''

	@property
	def is_succeed(self):
		"""
		Getter of __is_succeed
		:return: is_succeed value
		"""
		return self.__is_succeed

	@is_succeed.setter
	def is_succeed(self, value):
		"""
		Setter of __is_succeed
		:param value: value to set
		"""
		self.__is_succeed = bool(value)

	@property
	def data(self):
		"""
		Getter of __data
		:return: data value
		"""
		return self.__data

	@data.setter
	def data(self, value):
		"""
		Setter of __data
		:param value: value to set
		"""
		self.__data = value

	@property
	def message(self):
		"""
		Getter of __message
		:return: message value
		"""
		return self.__message

	@message.setter
	def message(self, value):
		"""
		Setter of __message
		:param value: value to set
		"""
		self.__message = value
