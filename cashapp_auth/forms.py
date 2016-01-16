from django import forms


class SigninForm(forms.Form):
	"""
	Signin model form
	"""
	username = forms.CharField(min_length=3, max_length=20)
	password = forms.CharField(min_length=6)