import time
from unittest import TestCase

from django.test import Client

from cashapp_models.models.ExpenseTransactionModel import ExpenseTransaction
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction
from cashapp_models.models.PORegisterModel import PORegister
from cashapp_tests.server import Dummies


class TestManageTransactionIncome(TestCase):
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

	def test_create_transaction_value_error_field(self):
		post_data = dict(self.new_transaction)
		post_data['value'] = 'error'

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('"value": ["\'error\' value must be a decimal number."]', response.content)

	def test_create_transaction_poid_error_field(self):
		post_data = dict(self.new_transaction)
		post_data['payment_object_id'] = '42'

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('"payment_object": ["payment object instance with guid \'42\' does not exist."]', response.content)

	def test_create_transaction_success(self):
		post_data = self.new_transaction

		income_transactions_count = len(IncomeTransaction.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(income_transactions_count + 1, len(IncomeTransaction.objects.filter(payment_object = self.po)))

	def test_create_transaction_register_record_success(self):
		post_data = self.new_transaction

		register_records_count = len(PORegister.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'income/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(register_records_count + 1, len(PORegister.objects.filter(payment_object = self.po)))


class TestManageTransactionExpense(TestCase):
	def setUp(self):
		self.url = '/api/cmn/transaction/'
		self.request_content_type = 'application/json'
		self.client = Client()

		self.user = Dummies.get_or_create_user()
		self.po = Dummies.get_or_create_po()
		self.transaction_status_success = Dummies.get_or_create_transaction_status('success')
		self.transaction_status_success = Dummies.get_or_create_transaction_status('error')
		self.supplier = Dummies.get_or_create_supplier()
		self.expense_item = Dummies.get_or_create_expense_item()

		self.client.login(username = self.user.username, password = Dummies.get_password())
		self.key = 'transaction'

		self.new_transaction = {
			'date': int(time.time()) * 100,
			'supplier_id': self.supplier.guid,
			'payment_object_id': self.po.guid,
			'expense_items': []
		}

	def test_create_transaction_with_no_type_defined(self):
		response = self.client.post(self.url, data = {}, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('Transaction type is not defined', response.content)

	def test_create_transaction_error_field(self):
		post_data = dict(self.new_transaction)
		post_data['date'] = ''

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('"date": ["This field cannot be null."]', response.content)

	def test_create_transaction_empty_expense_items_error(self):
		post_data = dict(self.new_transaction)

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('"expense_items": ["Transaction should contain expense item(s)"]', response.content)

	def test_create_transaction_success(self):
		post_data = self.new_transaction
		post_data['date'] = 1462964567245
		post_data['expense_items'] = [
			{
				'expense_item_id': self.expense_item.guid,
				'count': 2,
				'price': 100.00
			}
		]

		expense_transactions_count = len(ExpenseTransaction.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(expense_transactions_count + 1, len(ExpenseTransaction.objects.filter(payment_object = self.po)))

	def test_create_transaction_success_total_amount_calc(self):
		post_data = self.new_transaction
		post_data['date'] = 1465463456560
		post_data['expense_items'] = [
			{
				'expense_item_id': self.expense_item.guid,
				'count': 2,
				'price': 150.00
			}
		]

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertIn("300.00", response.content)

	def test_create_transaction_success_expense_item_register_created(self):
		post_data = self.new_transaction
		post_data['date'] = 1465634564532
		post_data['expense_items'] = [
			{
				'expense_item_id': self.expense_item.guid,
				'count': 2,
				'price': 123.45
			}
		]

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(round(Dummies.get_or_create_expense_item().get_last_register_record().value, 2), 123.45)

	def test_create_transaction_register_record_success(self):
		post_data = self.new_transaction
		post_data['date'] = 1462969766575
		post_data['expense_items'] = [
			{
				'expense_item_id': self.expense_item.guid,
				'count': 2,
				'price': 100.00
			}
		]

		register_records_count = len(PORegister.objects.filter(payment_object = self.po))

		response = self.client.post(self.url + 'expense/', data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertEqual(register_records_count + 1, len(PORegister.objects.filter(payment_object = self.po)))

