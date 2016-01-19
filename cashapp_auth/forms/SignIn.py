from django import forms


class SignInForm(forms.Form):
	"""
	SignIn model form
	"""
	username = forms.CharField(min_length=3, max_length=20, required=True)
	password = forms.CharField(min_length=6, max_length=30, required=True)
