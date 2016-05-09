from decimal import Decimal
from django.db import models

from cashapp_models.managers.IncomeTransactionManager import IncomeTransactionManager
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.TransactionModelBase import TransactionModelBase


class IncomeTransaction(ModelBase, TransactionModelBase):
	"""
	Represents Income transaction table
	"""
	value = models.DecimalField(null = False, decimal_places = 2, max_digits = 17)

	objects = IncomeTransactionManager()

	class Meta:
		app_label = 'cashapp_models'

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'value': self.value,
		}
		natural_keys = super(IncomeTransaction, self).natural_key(self_keys)
		return natural_keys

	def serialize(self, format = 'json', include_fields = (), exclude_fields = (), use_natural_foreign_keys = True, use_natural_primary_keys = True,
					include_user = False):
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
		serialized = super(IncomeTransaction, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
															use_natural_primary_keys)
		serialized['type'] = 'income'
		return serialized

	def set_register_value(self, register_record):
		"""
		Set register value
		:param register_record:
		:return:
		"""
		super(IncomeTransaction, self).set_register_value(register_record)

		register_record.value += Decimal(self.value)
