from unittest import TestCase
from django.contrib.auth.models import User
from django.test import Client


class TestSignUp(TestCase):
	def setUp(self):
		"""
		Tests setups
		"""
		self.url = '/api/auth/signup/'
		self.request_content_type = 'application/json'
		self.client = Client()
		self.data = {
			'username': 'exampler',
			'email': 'example@text.com',
			'password': '1234567890',
			'confirm_password': '1234567890'
		}

		User.objects.all().delete()

	def test_sign_up_bad_request(self):
		"""
		Test to call status 400
		"""
		self.data['password'] = ''
		response = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertEqual(response.content, '{"confirm_password": ["Your passwords do not match"], "password": ["This field is required."]}', response.content)

	def test_sign_up_ok(self):
		"""
		Test to call status 200. New user created
		"""
		users_count = len(User.objects.all())
		response = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)
		self.assertEqual(len(User.objects.all()), users_count + 1, 'User dosen\'t created')

	def test_sign_up_internal_server_error(self):
		"""
		Test to call status 500. Trying to create user with the same name
		"""
		users_count = len(User.objects.all())

		# create the first user
		response_1 = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response_1.status_code, 200, response_1.content)
		self.assertEqual(len(User.objects.all()), users_count + 1, 'First User dosen\'t created')

		# create the second user
		response_2 = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response_2.status_code, 500, response_2.content)
		self.assertEqual(len(User.objects.all()), users_count + 1)


class TestSignIn(TestCase):
	def setUp(self):
		"""
		Tests setups
		"""
		self.url = '/api/auth/signin/'
		self.request_content_type = 'application/json'
		self.client = Client()
		self.data = {
			'username': 'exampler',
			'password': '1234567890',
		}

		if not User.objects.exists():
			User.objects.create_user(self.data['username'], 'some@email.test', self.data['password'])

	def test_sign_in_bad_request(self):
		"""
		Test to call status 400
		"""
		self.data['password'] = ''
		response = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 400, response.content)
		self.assertEqual(response.content, '{"password": ["This field is required."]}', response.content)

	def test_sign_in_ok(self):
		"""
		Test to call status 200. User singed in
		"""
		response = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 200, response.content)

	def test_sign_in_internal_server_error(self):
		"""
		Test to call status 500. Invalid username
		"""
		self.data['username'] = 'tester'

		response = self.client.post(self.url, self.data, content_type=self.request_content_type)

		self.assertEqual(response.status_code, 500, response.content)
		self.assertEqual(response.content, '{"username": ["Invalid username or password"], "password": ["Invalid username or password"]}', response.content)