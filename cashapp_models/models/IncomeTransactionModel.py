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

	def create_register_record(self):
		"""
		Overrides base class method
		:return: {PORegister} instance
		"""
		previous_register_record = self.payment_object.get_register_record(self.date)

		from cashapp_models.models.PORegisterModel import PORegister
		register_record = PORegister(
			payment_object_id = self.payment_object.guid,
			value = previous_register_record.value if previous_register_record else Decimal(0),
			date = self.date
		)
		register_record.value += Decimal(self.value)
		register_record.save()

		PORegister.objects.update_register_values(self.payment_object.guid, Decimal(self.value), True, register_record.date)

		return register_record
