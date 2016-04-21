from django.db import models

from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.SupplierModel import Supplier
from cashapp_models.models.TransactionModelBase import TransactionModelBase


class ExpenseTransaction(ModelBase, TransactionModelBase):
	"""
	Represents Expense transaction table
	"""
	supplier = models.ForeignKey(Supplier, to_field = 'guid', on_delete = models.PROTECT, null = False)

	class Meta:
		app_label = 'cashapp_models'
