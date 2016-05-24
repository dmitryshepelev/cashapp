import json
from unittest import TestCase

from django.test import Client

from cashapp_models.models.ExpenseItemModel import ExpenseItem
from cashapp_tests.server import Dummies


class TestManage_ExpenseItem(TestCase):
	def setUp(self):
		self.url = '/api/cmn/expenseitem/'
		self.request_content_type = 'application/json'
		self.client = Client()

		self.measure = Dummies.get_or_create_measure()
		self.category = Dummies.get_or_create_root_category()
		self.supplier = Dummies.get_or_create_supplier()
		self.currency = Dummies.get_or_create_currency()
		self.user = Dummies.get_or_create_user()
		self.client.login(username=self.user.username, password=Dummies.get_password())

		self.post_data = {
			'name': 'test_1',
			'description': 'test description',
			'currency_id': self.currency.guid,
			'measure_id': self.measure.guid,
			'supplier_id': self.supplier.guid,
			'category_id': self.category.guid,
		}

	def test_create_success(self):
		expense_items_count = len(ExpenseItem.objects.all())

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)

		self.assertIn('"name": "test_1"', response.content)
		self.assertEqual(len(ExpenseItem.objects.all()), expense_items_count + 1)

	def test_create_empty_description_no_error(self):
		expense_items_count = len(ExpenseItem.objects.all())
		post_data = self.post_data
		post_data['name'] = 'test_2'
		post_data['description'] = ''

		response = self.client.post(self.url, self.post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)

		self.assertIn('"description": ""', response.content)
		self.assertEqual(len(ExpenseItem.objects.all()), expense_items_count + 1)

	def test_create_forms_errors(self):
		post_data = self.post_data
		post_data['name'] = ''

		response = self.client.post(self.url, post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)

		self.assertIn('"name": ["This field is required."]', response.content)

	def test_create_saving_error(self):
		post_data = self.post_data
		post_data['supplier_id'] = self.category.guid

		response = self.client.post(self.url, post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 500, response.content)

		self.assertIn('The error was occured during saving process', response.content)