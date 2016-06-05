from django.db import models


class TransactionModelBaseManager(models.Manager):
	"""
	Base object manager
	"""
	def get_po_associated(self, payment_object, order_by = '-date'):
		"""
		Returns po associated transactions
		Returns associated transactions
		:param order_by:
		:param payment_object:
		:return:
		"""
		return self.filter(payment_object = payment_object).order_by(order_by)

	def get_aggregated_by_days(self, payment_object):
		"""
		Needs to be overridden
		:param payment_object:
		:return:
		"""
		raise NotImplementedError()
