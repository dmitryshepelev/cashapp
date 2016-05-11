from django.db import models


class TransactionStatusManager(models.Manager):
	"""
	Model manager
	"""
	def get_success_status(self):
		"""
		Returns success transaction status
		:return:
		"""
		return self.get(name = 'success')
