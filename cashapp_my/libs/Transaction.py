from django.core.exceptions import ValidationError

from cashapp.libs.DateTimeUtil import DateTimeUtil
from cashapp_models.Exceptions.TransactionSaveError import TransactionSaveError
from cashapp_models.models.ExpenseTransactionItemModel import ExpenseTransactionItem
from cashapp_models.models.ExpenseTransactionModel import ExpenseTransaction as ETModel
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction as ITModel
from cashapp_my.forms.ExpenseTransactionForm import ExpenseTransactionForm
from cashapp_my.forms.ExpenseTransactionItemForm import ExpenseTransactionItemForm
from cashapp_my.forms.IncomeTransactionForm import IncomeTransactionForm


class Transaction(object):
	def __init__(self, model, form):
		self.__data = None
		self.__model = model
		self.__form = form
		self.__model_instance = None

	@property
	def data(self):
		if not self.__data:
			raise ReferenceError('\'data\' must be set')

		return self.__data

	@data.setter
	def data(self, value):
		self.__data = value

	@property
	def model(self):
		return self.__model

	@property
	def model_instance(self):
		"""
		Getter of __model_instance
		:return: model_instance value
		"""
		return self.__model_instance

	@model_instance.setter
	def model_instance(self, value):
		self.__model_instance = value

	@property
	def form(self):
		return self.__form(self.data)

	def create_model_instance(self, user):
		"""
		Creates model instance
		:param user:
		:return:
		"""
		raise NotImplementedError()

	def is_form_valid(self):
		"""
		Validate form
		:return:
		"""
		return self.form.is_valid()

	def save_model(self):
		"""
		Saves the model instance
		:return:
		"""
		return self.__model_instance.save()

	@staticmethod
	def create(transaction_type):
		"""
		Creates concrete Transaction
		:param transaction_type:
		:return:
		"""
		transaction_map = {
			'income': IncomeTransaction,
			'expense': ExpenseTransaction
		}
		return transaction_map.get(transaction_type)()


class IncomeTransaction(Transaction):
	def __init__(self):
		"""
		Income Transaction abstraction
		"""
		super(IncomeTransaction, self).__init__(ITModel, IncomeTransactionForm)

	def create_model_instance(self, user):
		"""
		Create model instance
		:param user:
		:return:
		"""
		model = self.model(
			value = self.data.get('value'),
			description = self.data.get('description'),
			date = DateTimeUtil.from_timestamp(self.data.get('date')),
			user_id = user.pk,
			payment_object_id = self.data.get('payment_object_id'),
		)
		self.model_instance = model
		return model


class ExpenseTransaction(Transaction):
	def __init__(self):
		"""
		Expense transaction abstraction
		:param model:
		:param form:
		"""
		super(ExpenseTransaction, self).__init__(ETModel, ExpenseTransactionForm)

	def create_model_instance(self, user):
		"""
		Create model instance
		:param user:
		:return:
		"""
		model = self.model(
			supplier_id = self.data.get('supplier_id'),
			description = self.data.get('description'),
			date = DateTimeUtil.from_timestamp(self.data.get('date')),
			user_id = user.pk,
			payment_object_id = self.data.get('payment_object_id'),
		)
		self.model_instance = model
		return model

	def is_form_valid(self):
		"""
		Override base class method
		:return:
		"""
		is_valid = super(ExpenseTransaction, self).is_form_valid()

		expense_items = self.data['expense_items']
		if len(expense_items) == 0:
			self.form.add_error(None, ValidationError('Set the one expense item at least'))
			return False

		else:
			is_expense_items_valid = True
			for ei in expense_items:
				form = ExpenseTransactionItemForm(ei)

				if not form.errors:
					is_expense_items_valid = False

			if not is_expense_items_valid:
				self.form.add_error(None, ValidationError('One or more expense items have invalid data'))

		return is_valid

	def save_model(self):
		"""
		Overrides base class method
		:return:
		"""
		super(ExpenseTransaction, self).save_model()

		try:
			for expense_item in self.data['expense_items']:
				expense_item_model = ExpenseTransactionItem(
					expense_item_id = expense_item['guid'],
					transaction_id = self.model_instance.guid,
					count = expense_item['count']
				)
				expense_item_model.save()

				expense_item_register_record = expense_item_model.create_register_record(expense_item['price'])
				expense_item_register_record.save()
		except Exception as e:
			raise TransactionSaveError('The error is occupied during expense items saving', e)

		return self.model_instance
