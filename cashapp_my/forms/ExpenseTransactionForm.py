from django import forms


class ExpenseTransactionForm(forms.Form):
	"""
	Income Transaction form
	"""
	date = forms.CharField(required = True, max_length = 24)
	payment_object_id = forms.CharField(required = True, max_length = 40)
	description = forms.CharField(max_length = 1000, required = False)
	supplier_id = forms.CharField(required = True, max_length = 40)


