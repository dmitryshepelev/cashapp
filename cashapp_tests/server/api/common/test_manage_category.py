from unittest import TestCase

from django.test import Client

from cashapp_models.models.CategoryLevelModel import CategoryLevel
from cashapp_models.models.CategoryModel import Category
from cashapp_tests.server import Dummies


class TestManage_category(TestCase):
	def setUp(self):
		self.url = '/api/cmn/category/'
		self.request_content_type = 'application/json'
		self.client = Client()

		self.root_category_level = Dummies.get_or_create_root_category_level()
		self.user = Dummies.get_or_create_user()
		self.client.login(username=self.user.username, password=Dummies.get_password())
		self.root_category = Dummies.get_or_create_root_category()

		self.post_data = {
			'name': '',
			'parent_guid': ''
		}

	def set_post_data(self, name = '', parent_guid = ''):
		if name:
			self.post_data['name'] = name
		if parent_guid:
			self.post_data['parent_guid'] = parent_guid

	def test_create_new_category_form_error(self):
		self.set_post_data()

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertIn('This field is required', response.content)

	def test_create_new_root_category_success(self):
		name = 'test_1'
		self.set_post_data(name)

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertIn('"name": "{name}"'.format(name = name), response.content)
		self.assertIn('"name": "L0"', response.content)

	def test_create_new_category_check_owner(self):
		name = 'test_2'
		self.set_post_data(name)

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)

		category = Category.objects.get(name = name)
		self.assertEqual(self.user.pk, category.owner_id)

	def test_create_new_subcategory_parent_doesnot_exist(self):
		name = 'test_3'
		self.set_post_data(name, 'test_parent_id')

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 404, response.content)
		self.assertIn('Parent category does not exist', response.content)

	def test_create_new_subcategory_success(self):
		name = 'test_4'
		self.set_post_data(name, self.root_category.guid)

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 201, response.content)
		self.assertIn('"name": "{name}"'.format(name = name), response.content)
		self.assertIn('"name": "L1"', response.content)

	def test_create_new_subcategory_max_nesting_reached(self):
		last_category = self.root_category

		for i in range(0, 10):
			try:
				last_category = Category.objects.create_sub(
					name = 'test_category_{i}'.format(i = i),
					parent = last_category
				)
				last_category.owner = self.user
				last_category.save()
			except Exception as e:
				break

		self.assertEqual(len(CategoryLevel.objects.all()), 10)
		self.assertEqual(last_category.level.name, 'L9')

		name = 'test_5'
		self.set_post_data(name, last_category.guid)

		response = self.client.post(self.url, self.post_data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 500, response.content)
		self.assertIn('Max Category nesting reached', response.content)
