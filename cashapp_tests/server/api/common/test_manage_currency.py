from ast import literal_eval
from unittest import TestCase

from django.test import Client

from cashapp_tests.server import Dummies


class TestManage_currency(TestCase):
	def setUp(self):
		self.url = '/api/cmn/currency/'
		self.request_content_type = 'application/json'
		self.client = Client()

		currency = Dummies.get_or_create_currency()
		user = Dummies.get_or_create_user()
		self.client.login(username=user.username, password=Dummies.get_password())

	def test_get_all_currencies(self):
		response = self.client.get(self.url, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		currencies = literal_eval(response.content)
		self.assertIsInstance(currencies, dict, currencies)

		key = 'currencies'
		self.assertIn(key, currencies)

		self.assertEqual(len(currencies.get(key)), 1)
