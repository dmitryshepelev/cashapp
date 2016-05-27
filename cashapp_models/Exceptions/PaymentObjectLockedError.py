from cashapp_models.Exceptions.ModelsAppBaseException import ModelsAppBaseException


class PaymentObjectLockedError(ModelsAppBaseException):
	"""
	Raise when payment object is_locked status is True
	"""
	pass
