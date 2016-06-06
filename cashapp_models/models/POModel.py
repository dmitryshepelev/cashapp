from datetime import datetime

from django.contrib.auth.models import User
from django.db import models

from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.POTypeModel import POType


class PaymentObject(ModelBase):
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

	def get_aggregated_by_days_register_records(self, start_date = None, end_date = None, normalize = True):
		"""
		Returns aggregated register records
		:return: {list}
		"""
		from cashapp_models.models.PORegisterModel import PORegister
		register_records = PORegister.objects.aggregate_by_days(self, start_date = start_date, end_date = end_date)

		if normalize:
			return register_records.normalize()

		return register_records

	def get_last_register_record(self):
		"""
		Overrides base class method
		:return: {PORegister} instance
		"""
		return self.poregister_set.order_by('-date').first()

	def get_register_record(self, dt = None):
		"""
		Get register record on specified date
		:param dt:
		:return:
		"""
		dt = dt or datetime.now()
		return self.poregister_set.filter(creation_datetime__lte = dt).order_by('date').last()

	def get_protected_fields(self):
		"""
		Overrides base class method
		:return:
		"""
		fields = super(PaymentObject, self).get_protected_fields()
		return tuple(set(fields) | {'user_id'})

	def is_locked(self):
		"""
		Returns is_locked status
		:return:{bool}
		"""
		return False
