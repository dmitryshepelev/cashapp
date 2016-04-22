import datetime
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Max
from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.POTypeModel import POType
from cashapp_models.models.ModelBase import ModelBase


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

	def get_last_register(self):
		"""
		Get last register
		:return: PORegister model
		"""
		return self.poregister_set.annotate(max_date = Max('date')).first()

	def save(self, balance = None, force_insert = False, force_update = False, using = None, update_fields = None):
		"""
		Overrides base save method
		:param balance: Decimal value. if specified a new PORegister entity will created
		:param force_insert:
		:param force_update:
		:param using:
		:param update_fields:
		:return: saved instance
		"""
		super(PaymentObject, self).save(force_insert, force_update, using, update_fields)

		if balance:
			self.poregister_set.create(date = datetime.datetime.now(), balance = balance)

		return self

	@staticmethod
	def parse(item, type, user_id):
		"""
		Parse item into PaymentObject instance
		:param item: {dict} of Payment object parameters
		:param type: 'card' or 'cash' value
		:param user_id: user id
		:return: Finance instance
		"""
		if not isinstance(item, dict):
			raise TypeError('\'item\' parameter type isn\'t dict type')

		balance = item.get('balance', None)
		if not balance:
			return None

		is_card = type.lower() == 'card'

		guid = item.get('guid', '')
		name = (item.get('name') or 'card') if is_card else None
		currency_code = item.get('currency', {}).get('code', 'BYR')

		return PaymentObject(guid = guid, name = name, currency_id = currency_code, user_id = user_id, type_id = type)
