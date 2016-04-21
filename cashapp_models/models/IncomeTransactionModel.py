from django.db import models

from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.TransactionModelBase import TransactionModelBase


class IncomeTransaction(ModelBase, TransactionModelBase):
	"""
	Represents Income transaction table
	"""
	value = models.DecimalField(null = False, decimal_places = 2, max_digits = 17)

	class Meta:
		app_label = 'cashapp_models'
