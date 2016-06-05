from cashapp_models.exceptions.ModelsAppBaseException import ModelsAppBaseException


class FetchDateError(ModelsAppBaseException):
	"""
	Raises when data fetch error
	"""