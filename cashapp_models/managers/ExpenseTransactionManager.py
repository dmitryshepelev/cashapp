from cashapp_models.managers.TransactionModelBaseManager import TransactionModelBaseManager


class ExpenseTransactionManager(TransactionModelBaseManager):
	"""
	Concrete class manager
	"""
	def get_po_associated(self, payment_object):
		"""
		Overrides base class method
		:param payment_object:
		:return:
		"""
		return self.filter(payment_object = payment_object).order_by('-date')

