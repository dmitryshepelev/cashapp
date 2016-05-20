from django import forms


class SupplierForm(forms.Form):
	"""
	Manage Supplier form
	"""
	name = forms.CharField(max_length = 30, required = True)
	description = forms.CharField(max_length = 1000, required = False)
