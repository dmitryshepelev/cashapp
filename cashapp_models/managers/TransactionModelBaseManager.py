from django.db import models


class TransactionModelBaseManager(models.Manager):
	"""
	Base object manager
	"""
	def get_po_associated(self, payment_object):
		"""
		Needs to be overrides
		Returns associated transactions
		:param payment_object:
		:return:
		"""
		raise NotImplementedError()