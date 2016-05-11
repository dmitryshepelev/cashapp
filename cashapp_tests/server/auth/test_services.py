from unittest import TestCase

from django.contrib.auth.models import User

from cashapp_auth.services import authenticate
from cashapp_tests.server import Dummies


class TestAuthenticate(TestCase):
	def setUp(self):
		"""
		Tests setups
		"""
		self.user = Dummies.get_or_create_user()

	def test_authenticate_success(self):
		"""
		Test success
		"""
		result = authenticate(self.user.username, Dummies.get_password())

		self.assertEqual(result.is_succeed, True)
		self.assertEqual(result.data, User.objects.get(username='tester'))

	def test_authenticate_error_invalid_username(self):
		"""
		Test error
		"""
		result = authenticate('super_tester', '1234567890')

		self.assertEqual(result.is_succeed, False)
		self.assertEqual(result.data['username'], ['Invalid username or password'])

	def test_authenticate_error_invalid_password(self):
		"""
		Test error
		"""
		result = authenticate(self.user.username, '0987654321')

		self.assertEqual(result.is_succeed, False)
		self.assertEqual(result.data['password'], ['Invalid username or password'])

