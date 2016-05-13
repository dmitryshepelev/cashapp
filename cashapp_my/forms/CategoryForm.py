from django import forms


class CategoryForm(forms.Form):
	"""
	Manage Category form
	"""
	name = forms.CharField(max_length = 30, required = True)
	parent_id = forms.CharField(required = False, max_length = 40)
