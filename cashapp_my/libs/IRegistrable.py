class IRegistrable():
	"""
	Class to provide register interface to the objects
	"""
	def create_register_record(self, transaction):
		"""
		Creates {PORegister} record
		:param transaction: {TransactionModelBase} instance
		:return: {PORegister} instance
		"""
		from cashapp_models.models.TransactionModelBase import TransactionModelBase
		if not isinstance(transaction, TransactionModelBase):
			raise TypeError('Argument is not an instance of TransactionModelBase type')

	def get_last_register_record(self):
		"""
		Returns last register record
		:return:
		"""
		raise NotImplementedError()
