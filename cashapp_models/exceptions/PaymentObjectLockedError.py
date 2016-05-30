from cashapp_models.exceptions.ModelsAppBaseException import ModelsAppBaseException


class PaymentObjectLockedError(ModelsAppBaseException):
	"""
	Raise when payment object is_locked status is True
	"""
	pass
