from django import forms


class SignUpForm(forms.Form):
	"""
	SignUp model form
	"""
	username = forms.CharField(min_length=3, max_length=20, required=True)
	email = forms.EmailField(min_length=7, max_length=30, required=True)
	password = forms.CharField(min_length=6, max_length=30, required=True)
	confirm_password = forms.CharField(min_length=6, max_length=30, required=True)

	def clean(self):
		"""
		Override clean method to validate 'password' and 'confirm_password' field
		:return: cleaned data
		"""
		cleaned_data = super(SignUpForm, self).clean()
		password = cleaned_data.get('password')
		confirm_password = cleaned_data.get('confirm_password')

		if password != confirm_password:
			self.add_error('confirm_password', 'Your passwords do not match')

		return self.cleaned_data