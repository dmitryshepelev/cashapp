class RepositoryBase(object):
	"""
	Base class of repository
	"""
	def __init__(self, e_type):
		self.e_type = e_type

	def create(self, **kwargs):
		"""
		Generic creation method
		:param kwargs: fields of the instance
		:return: instance of e_type
		"""
		instance = self.e_type.objects.create(**kwargs)
		return instance

	def get_all(self):
		"""
		Returns all records of e_type
		:return: List
		"""
		return self.e_type.objects.all()

	def get(self, *args, **kwargs):
		"""
		Get an instance
		:param args:
		:param kwargs:
		:return: instance of e_type
		"""
		return self.e_type.objects.get(args, kwargs)