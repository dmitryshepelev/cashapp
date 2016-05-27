from django.db import models

from cashapp_models.managers.TransactionStatusManager import TransactionStatusManager
from cashapp_models.models.ModelBase import ModelBase


class TransactionStatus(ModelBase):
	"""
	Represents Transaction status table
	"""
	name = models.CharField(max_length = 20, null = False, unique = True)

	objects = TransactionStatusManager()

	class Meta:
		app_label = 'cashapp_models'

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'name': self.name,
		}
		natural_keys = super(TransactionStatus, self).natural_key(self_keys)
		return natural_keys
