from django.contrib.auth.models import User

from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.POTypeModel import POType
from cashapp_models.models.TransactionStatusModel import TransactionStatus

__author__ = 'dshepelev'


class Dummies():
	@staticmethod
	def get_or_create_user():
		try:
			dummy = User.objects.get(username='tester')
		except Exception as e:
			dummy = User.objects.create_user(username='tester', email='text@email.test', password=Dummies.get_password())
		return dummy

	@staticmethod
	def get_password():
		return 'test_pass'

	@staticmethod
	def get_or_create_currency():
		try:
			dummy = Currency.objects.get(code='dum')
		except Exception as e:
			currency = {
				'code': 'dum',
				'hex': '\0024',
				'dec': '34',
				'label': 'usd'
			}
			dummy = Currency.objects.create(**currency)
		return dummy

	@staticmethod
	def get_or_create_po_type():
		try:
			dummy = POType.objects.get(name='dummy')
		except Exception as e:
			po_type = {
				'name': 'dummy',
			}
			dummy = POType.objects.create(**po_type)
		return dummy

	@staticmethod
	def get_or_create_po():
		try:
			dummy = PaymentObject.objects.get(name='dummy')
		except Exception as e:
			po = {
				'name': 'dummy',
				'allow_negative': False,
				'primary': True,
				'currency_id': Dummies.get_or_create_currency().guid,
				'type_id': Dummies.get_or_create_po_type().guid,
				'user_id': Dummies.get_or_create_user().id
			}
			dummy = PaymentObject.objects.create(**po)
		return dummy

	@staticmethod
	def get_or_create_transaction_status(name):
		try:
			dummy = TransactionStatus.objects.get(name=name)
		except Exception as e:
			dummy = TransactionStatus.objects.create(name=name)
		return dummy
