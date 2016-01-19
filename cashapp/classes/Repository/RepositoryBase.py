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