from decimal import Decimal
from django.db import models

from cashapp.decorators import payment_object_permission
from cashapp_models.managers.ExpenseTransactionManager import ExpenseTransactionManager
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.SupplierModel import Supplier
from cashapp_models.models.TransactionModelBase import TransactionModelBase


class ExpenseTransaction(ModelBase, TransactionModelBase):
	"""
	Represents Expense transaction table
	"""
	supplier = models.ForeignKey(Supplier, to_field = 'guid', on_delete = models.PROTECT, null = False)

	objects = ExpenseTransactionManager()

	class Meta:
		app_label = 'cashapp_models'

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {

		}
		natural_keys = super(ExpenseTransaction, self).natural_key(self_keys)
		return natural_keys

	def serialize(self, format = 'json', include_fields = (), exclude_fields = (), use_natural_foreign_keys = True,
				use_natural_primary_keys = True, include_user = False):
		"""
		Overrides base class method
		:param format:
		:param include_fields:
		:param exclude_fields:
		:param use_natural_foreign_keys:
		:param use_natural_primary_keys:
		:return:
		"""
		exclude_fields = tuple(set(exclude_fields) | {'user'})
		serialized = super(ExpenseTransaction, self).serialize(format, include_fields, exclude_fields,
						use_natural_foreign_keys, use_natural_primary_keys)
		serialized['type'] = 'expense'
		serialized['value'] = '{:.2f}'.format(self.get_total_value())
		return serialized

	def get_total_value(self):
		"""
		Returns sum of transaction
		:return: {Decimal}
		"""
		expense_transaction_items = self.expensetransactionitem_set.all()

		total_value = 0
		for expense_transaction_item in expense_transaction_items:
			total_value += Decimal(expense_transaction_item.count) * expense_transaction_item.expense_item.expenseitemregister_set.get(date = self.date).value

		return round(total_value, 2)

	def create_register_record(self):
		"""
		Overrides base class method
		:return: {PORegister} instance
		"""
		last_register_record = self.payment_object.get_last_register_record()

		from cashapp_models.models.PORegisterModel import PORegister
		register_record = PORegister(
			payment_object_id = self.payment_object.guid,
			value = last_register_record.value if last_register_record else Decimal(0),
			date = self.date
		)
		register_record.value -= Decimal(self.get_total_value())

		return register_record

	def save(self, force_insert = False, force_update = False, using = None, update_fields = None):
		"""
		Overrides base class method
		:param force_insert:
		:param force_update:
		:param using:
		:param update_fields:
		:return:
		"""
		super(ExpenseTransaction, self).save(force_insert, force_update, using, update_fields)