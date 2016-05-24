import json
from unittest import TestCase

from django.test import Client

from cashapp_tests.server import Dummies


class TestManage_measure(TestCase):
	def setUp(self):
		self.url = '/api/cmn/measure/'
		self.request_content_type = 'application/json'
		self.client = Client()

		measure = Dummies.get_or_create_measure()
		user = Dummies.get_or_create_user()
		self.client.login(username=user.username, password=Dummies.get_password())

	def test_get_all_measures(self):
		response = self.client.get(self.url, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		measures = json.loads(response.content)
		self.assertIsInstance(measures, dict, measures)

		key = 'measures'
		self.assertIn(key, measures)

		self.assertEqual(len(measures.get(key)), 1)
