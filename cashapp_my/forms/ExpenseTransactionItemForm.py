from django import forms


class ExpenseTransactionItemForm(forms.Form):
	"""
	Expense transaction item form
	"""
	guid = forms.CharField(required = True, max_length = 40)
	count = forms.FloatField(required = True)
	value = forms.FloatField(required = True)