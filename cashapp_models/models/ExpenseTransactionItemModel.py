from decimal import Decimal
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

	def create_register_record(self, value = None):
		"""
		Creates register record for expense item
		:return:
		"""
		last_register_record = self.expense_item.get_last_register_record()

		from cashapp_models.models.ExpenseItemRegisterModel import ExpenseItemRegister
		register_record = ExpenseItemRegister(
			expense_item_id = self.expense_item.guid,
			value = Decimal(value) if value else last_register_record.value if last_register_record else Decimal(0),
			date = self.transaction.date
		)

		return register_record
