import json
from unittest import TestCase

from django.test import Client

from cashapp_models.models.POModel import PaymentObject
from cashapp_tests.server import Dummies


class TestManage_po(TestCase):
	def setUp(self):
		self.url = '/api/cmn/po/'
		self.request_content_type = 'application/json'
		self.client = Client()

		user = Dummies.get_or_create_user()
		po = Dummies.get_or_create_po()
		self.client.login(username=user.username, password=Dummies.get_password())
		self.key = 'po'

	def test_get_all_po(self):
		response = self.client.get(self.url, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		pos = json.loads(response.content)

		self.assertIsInstance(pos, dict, pos)
		self.assertIn(self.key, pos)
		self.assertEqual(len(pos.get(self.key)), len(PaymentObject.objects.all()))

	def test_get_single_po_success(self):
		existing_po = Dummies.get_or_create_po()

		response = self.client.get(self.url + existing_po.guid + '/', content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		po = json.loads(response.content)

		self.assertIsInstance(po, dict, po)
		self.assertIn(self.key, po)
		self.assertEqual(po.get(self.key).get('guid'), existing_po.guid, po)

	def test_get_single_po_error(self):
		existing_po = Dummies.get_or_create_po()
		guid = existing_po.guid[5:] + 'test1'

		response = self.client.get(self.url + guid + '/', content_type = self.request_content_type)

		self.assertEqual(response.status_code, 404, response.content)

		content = json.loads(response.content)
		self.assertEqual(content.get('message'), 'The object {guid} is\'n found'.format(guid=guid))

	def test_delete_po(self):
		response = self.client.delete(self.url, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400)

	def test_create_new_po_success(self):
		post_data = {
			'name': 'new_payment_object',
			'currency_id': Dummies.get_or_create_currency().guid,
			'type_id': Dummies.get_or_create_po_type().guid
		}
		number_of_pos = len(PaymentObject.objects.all())

		response = self.client.post(self.url, data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)

		po = json.loads(response.content)

		self.assertIsInstance(po, dict, po)

		po = po.get(self.key)

		self.assertIn('guid', po)
		self.assertEqual(po['name'], post_data['name'])
		self.assertEqual(number_of_pos + 1, len(PaymentObject.objects.all()))

	def test_create_new_po_name_length_error(self):
		post_data = {
			'name': 'the name is longer than thirty letters in a row',
			'currency_id': Dummies.get_or_create_currency().guid,
			'type_id': Dummies.get_or_create_po_type().guid
		}
		response = self.client.post(self.url, data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)

		content = json.loads(response.content)
		self.assertEqual(content.get('name')[0], 'Ensure this value has at most 30 characters (it has 47).', content.get('name')[0])

	def test_create_new_po_save_error(self):
		post_data = {
			'name': 'new_payment_object',
			'currency_id': Dummies.get_or_create_po_type().guid,
			'type_id': Dummies.get_or_create_po_type().guid
		}
		response = self.client.post(self.url, data = post_data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 500, response.content)

		content = json.loads(response.content)
		self.assertEqual(content.get('message'), 'The error was occured during saving process')

	def test_update_po_success(self):
		data = {
			'name': 'changed_name',
			'guid': Dummies.get_or_create_po().guid
		}
		response = self.client.put(self.url, data = data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

		content = json.loads(response.content)

		self.assertIsInstance(content, dict, content)
		self.assertIn(self.key, content)
		self.assertEqual(content.get(self.key).get('name'), data.get('name'))

	def test_update_po_guid_not_defined_error(self):
		data = {
			'name': 'changed_name',
		}
		response = self.client.put(self.url, data = data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)

	def test_update_po_object_not_found_error(self):
		data = {
			'name': 'changed_name',
			'guid': Dummies.get_or_create_currency().guid
		}
		response = self.client.put(self.url, data = data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 404, response.content)

	def test_update_po_save_error(self):
		data = {
			'name': 'changed_name',
			'guid': Dummies.get_or_create_po().guid,
			'type_id': Dummies.get_or_create_currency().guid
		}
		response = self.client.put(self.url, data = data, content_type = self.request_content_type)

		self.assertEqual(response.status_code, 500, response.content)
