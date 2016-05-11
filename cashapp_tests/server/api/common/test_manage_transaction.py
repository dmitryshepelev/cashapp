from unittest import TestCase

from django.test import Client

from cashapp_models.models.IncomeTransactionModel import IncomeTransaction
from cashapp_models.models.PORegisterModel import PORegister
from cashapp_tests.server import Dummies


class TestManageTransaction(TestCase):
	def setUp(self):
		self.url = '/api/cmn/transaction/'
		self.request_content_type = 'application/json'
		self.client = Client()

		self.user = Dummies.get_or_create_user()
		self.po = Dummies.get_or_create_po()
		self.transaction_status_success = Dummies.get_or_create_transaction_status('success')
		self.client.login(username = self.user.username, password = Dummies.get_password())
		self.key = 'transaction'

		self.new_transaction = {
			'date': 1462969764591,
			'value': '50000',
			'payment_object_id': self.po.guid
		}

	def test_create_transaction_with_no_type_defined(self):
		response = self.client.post(self.url, data = {}, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('Transaction type is not defined', response.content)

	def test_create_income_transaction_value_error_field(self):
		post_data = dict(self.new_transaction)
		post_data['value'] = 'error'

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('Enter a number.', response.content)

	def test_create_income_transaction_poid_error_field(self):
		post_data = dict(self.new_transaction)
		post_data['payment_object_id'] = '42'

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('Paymnet object does not exist', response.content)

	def test_create_income_transaction_success(self):
		post_data = self.new_transaction

		income_transactions_count = len(IncomeTransaction.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(income_transactions_count + 1, len(IncomeTransaction.objects.filter(payment_object = self.po)))

	def test_create_income_transaction_register_record_success(self):
		post_data = self.new_transaction

		register_records_count = len(PORegister.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(register_records_count + 1, len(PORegister.objects.filter(payment_object = self.po)))