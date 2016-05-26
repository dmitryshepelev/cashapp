from django import forms


class ExpenseItemForm(forms.Form):
	"""
	Expense item form
	"""
	name = forms.CharField(max_length = 100, required = True)
	description = forms.CharField(max_length = 1000, required = False)
	category_id = forms.CharField(required = True, max_length = 40)
	measure_id = forms.CharField(required = True, max_length = 40)
	currency_id = forms.CharField(required = True, max_length = 40)
