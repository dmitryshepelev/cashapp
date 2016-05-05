from django import forms


class ManagePOForm(forms.Form):
	"""
	Manage PO form
	"""
	name = forms.CharField(max_length = 30, required = True)
	allow_negative = forms.BooleanField(required = False)
	currency_id = forms.CharField(min_length = 40, max_length = 40, required = True)
	primary = forms.BooleanField(required = False)
	type_id = forms.CharField(min_length = 40, max_length = 40, required = True)
