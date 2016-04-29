import json
from ast import literal_eval
from unittest import TestCase

from django.test import Client

from cashapp_tests.server import Dummies


class TestManage_po(TestCase):
	def setUp(self):
		self.url = '/api/cmn/po/'
		self.request_content_type = 'application/json'
		self.client = Client()

		user = Dummies.get_or_create_user()
		po = Dummies.get_or_create_po()
		self.client.login(username=user.username, password=Dummies.get_password())

	def test_get_all_po(self):
		response = self.client.get(self.url, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		types = json.loads(response.content)
		self.assertIsInstance(types, dict, types)

		key = 'po'
		self.assertIn(key, types)

		self.assertEqual(len(types.get(key)), 1)
