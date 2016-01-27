class Message(object):

	@classmethod
	def __get_obj(cls, obj_type, text=None, header=None):
		"""
		Returns dict of Message
		:param obj_type: 'success', 'error', 'warning' or 'info'
		:param text: text
		:param header: header
		:return: dict
		"""
		return dict(type=obj_type, text=text or '', header=header or '')

	@classmethod
	def success(cls, text=None, header=None):
		"""
		Returns success message
		:param text:
		:param header:
		:return:
		"""
		return cls.__get_obj('success', text, header)

	@classmethod
	def error(cls, text=None, header=None):
		"""
		Returns error message
		:param text:
		:param header:
		:return:
		"""
		return cls.__get_obj('error', text, header)

	@classmethod
	def warning(cls, text=None, header=None):
		"""
		Returns warning message
		:param text:
		:param header:
		:return:
		"""
		return cls.__get_obj('warning', text, header)

	@classmethod
	def info(cls, text=None, header=None):
		"""
		Returns info message
		:param text:
		:param header:
		:return:
		"""
		return cls.__get_obj('info', text, header)
