from cashapp_models.exceptions.ModelsAppBaseException import ModelsAppBaseException


class PaymentObjectValueError(ModelsAppBaseException):
	"""
	Raise when payment object value doesn't allow to execute transaction
	"""
	pass
