from itertools import chain

from django.contrib.auth.models import User
from django.db import models
from django.db.models import Max

from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.POTypeModel import POType
from cashapp_my.libs.IRegistrable import IRegistrable


class PaymentObject(ModelBase, IRegistrable):
	"""
	Represents Payment object table
	"""
	name = models.CharField(max_length = 30, null = False)
	allow_negative = models.BooleanField(default = False)
	currency = models.ForeignKey(Currency, to_field = 'guid', on_delete = models.PROTECT)
	primary = models.BooleanField(null = False, default = False)
	user = models.ForeignKey(User, on_delete = models.CASCADE, null = False)
	type = models.ForeignKey(POType, to_field = 'guid', on_delete = models.PROTECT, null = False)

	class Meta:
		app_label = 'cashapp_models'

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'name': self.name,
			'allow_negative': self.allow_negative,
			'currency': self.currency.natural_key(),
			'primary': self.primary,
			'type': self.type.natural_key()
		}
		natural_keys = super(PaymentObject, self).natural_key(self_keys)
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
		serialized = super(PaymentObject, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
															use_natural_primary_keys)
		return serialized

	def create_register_record(self, transaction):
		"""
		Creates {PORegister} record
		:param transaction: {TransactionModelBase} instance
		:return: {PORegister} instance
		"""
		super(PaymentObject, self).create_register_record(transaction)

		last_register_record = self.get_last_register_record()

		from cashapp_models.models.PORegisterModel import PORegister
		register_record = PORegister(
			payment_object_id=self.guid,
			value=last_register_record.value if last_register_record else .0
		)
		transaction.set_register_value(register_record)
		transaction.set_register_date(register_record)

		return register_record

	def get_last_register_record(self):
		"""
		Overrides base class method
		:return: {PORegister} instance
		"""
		return self.poregister_set.annotate(max_date = Max('creation_datetime')).first()

	def get_protected_fields(self):
		"""
		Overrides base class method
		:return:
		"""
		fields = super(PaymentObject, self).get_protected_fields()
		return fields + ('user_id',)
