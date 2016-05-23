from cashapp_models.models.SupplierModel import Supplier


class SearchEngine(object):
	"""
	Class to provide search interface
	"""
	def __init__(self):
		self.__obj_type = None
		self.__model = None

	def __resolve_model(self, obj_type):
		"""
		Set __model value
		:param type:
		:return:
		"""
		d = {
			'supplier': Supplier
		}
		if obj_type in d.keys():
			self.__model = d[obj_type]
		else:
			raise ValueError('Cannot resolve model by given object type', obj_type = obj_type)

	@property
	def obj_type(self):
		"""
		Getter of __obj_type
		:return: obj_type value
		"""
		return self.__obj_type

	@obj_type.setter
	def obj_type(self, value):
		"""
		Setter of __obj_type
		:param value: value to set
		"""
		try:
			self.__resolve_model(value)
			self.__obj_type = value
		except ValueError as e:
			raise ValueError('Type not allowed')

	@property
	def model(self):
		"""
		Getter of __model
		:return: model value
		"""
		return self.__model

	def search(self, q, *args, **kwargs):
		"""
		Execute search through model
		:param q:
		:param args:
		:param kwargs:
		:return:
		"""
		return self.__model.objects.search(q, *args, **kwargs)
