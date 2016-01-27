from unittest import TestCase
from cashapp_auth.forms.SignUpForm import SignUpForm


class TestSignUpForm(TestCase):
	def setUp(self):
		self.data = {
			'username': 'exampler',
			'email': 'example@text.com',
			'password': '1234567890',
			'confirm_password': '1234567890'
		}

	def test_clean_password_dont_match(self):
		"""
		Password and Confirm password don't match
		"""
		self.data['confirm_password'] = '123456'

		form = SignUpForm(self.data)

		confirm_password_errors = form.errors.get('confirm_password')
		self.assertEqual(confirm_password_errors[0], 'Your passwords do not match', 'Passwords match')

	def test_clean_succeed(self):
		"""
		Form filled out without errors
		"""
		form = SignUpForm(self.data)

		self.assertEqual(len(form.errors), 0, 'There are errors')