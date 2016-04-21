from django.db import models

from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.TransactionModelBase import TransactionModelBase


class TransferTransaction(ModelBase, TransactionModelBase):
	"""
	Represents Transfer transaction table
	"""
	value = models.DecimalField(null = False, decimal_places = 2, max_digits = 17)
	target_payment_object_id = models.PositiveIntegerField(null = False)

	class Meta:
		app_label = 'cashapp_models'
