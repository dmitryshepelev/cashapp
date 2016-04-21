from django.db import models

from cashapp_models.models.ExpenseItemModel import ExpenseItem
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.RegisterModelBase import RegisterModelBase


class ExpenseItemRegister(ModelBase, RegisterModelBase):
	"""
	Represents ExpenseItem register table
	"""
	expense_item = models.ForeignKey(ExpenseItem, on_delete = models.PROTECT, to_field = 'guid', null = False)

	class Meta:
		app_label = 'cashapp_models'