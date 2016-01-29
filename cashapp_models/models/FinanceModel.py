import datetime
from django.contrib.auth.models import User
from django.db import models
from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.FinanceTypeModel import FinanceType
from cashapp_models.models.ModelBase import ModelBase


class Finance(ModelBase):
	name = models.CharField(max_length=30, null=True)
	is_locked = models.BooleanField(default=False)
	currency = models.ForeignKey(Currency, to_field='code')
	user = models.ForeignKey(User)
	type = models.ForeignKey(FinanceType, to_field='name')

	class Meta:
		app_label = 'cashapp_models'

	def save(self, balance=None, force_insert=False, force_update=False, using=None, update_fields=None):
		"""
		Overrides base save method
		:param balance: Decimal value. if specified a new FinanceRegister entity will created
		:param force_insert:
		:param force_update:
		:param using:
		:param update_fields:
		:return: saved instance
		"""
		super(Finance, self).save(force_insert, force_update, using, update_fields)

		if balance:
			self.financeregister_set.create(date=datetime.datetime.now(), balance=balance)

		return self

	@staticmethod
	def parse(item, type, user_id):
		"""
		Parse item into Finance instance
		:param item: {dict} of Finance parameters
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

		return Finance(guid=guid, name=name, currency_id=currency_code, user_id=user_id, type_id=type)