from cashapp_models.Exceptions.ModelsAppBaseException import ModelsAppBaseException


class BoundCategoryLevelException(ModelsAppBaseException):
	"""
	Raise when get_next() called and the object is last
	"""
	pass
