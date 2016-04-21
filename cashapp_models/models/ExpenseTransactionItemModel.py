from django.db import models

from cashapp_models.models.ExpenseItemModel import ExpenseItem
from cashapp_models.models.ExpenseTransactionModel import ExpenseTransaction
from cashapp_models.models.ModelBase import ModelBase


class ExpenseTransactionItem(ModelBase):
	"""
	Represents Expense transaction item table
	"""
	count = models.FloatField(null = False, default = 1)
	transaction = models.ForeignKey(ExpenseTransaction, to_field = 'guid', on_delete = models.CASCADE, null = False)
	expense_item = models.ForeignKey(ExpenseItem, to_field = 'guid', on_delete = models.PROTECT, null = False)

	class Meta:
		app_label = 'cashapp_models'
