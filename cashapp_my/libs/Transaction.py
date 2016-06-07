from django.core.exceptions import ValidationError

from cashapp.decorators import payment_object_permission
from cashapp.libs.DateTimeUtil import DateTimeUtil
from cashapp_models.exceptions.PaymentObjectLockedError import PaymentObjectLockedError
from cashapp_models.exceptions.PaymentObjectValueError import PaymentObjectValueError
from cashapp_models.exceptions.TransactionSaveError import TransactionSaveError
from cashapp_models.models.ExpenseTransactionItemModel import ExpenseTransactionItem
from cashapp_models.models.ExpenseTransactionModel import ExpenseTransaction as ETModel
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction as ITModel
from cashapp_models.models.TransactionStatusModel import TransactionStatus


class Transaction(object):
	def __init__(self, model_class):
		self.__model_class = model_class
		self.__model = self.__model_class()

	@property
	def model(self):
		"""
		Model getter
		:return:
		"""
		return self.__model

	def set_data(self, *args, **kwargs):
		"""
		Set model data
		:return:
		"""
		date = kwargs.get('date', None)
		if date:
			self.model.date = DateTimeUtil.convert_to_UTC(DateTimeUtil.from_timestamp(date))

		self.model.description = kwargs.get('description', self.model.description)
		self.model.payment_object_id = kwargs.get('payment_object_id', self.model.payment_object_id)
		self.model.user_id = kwargs.get('user_id', self.model.user_id)
		self.model.status_id = kwargs.get('status_id', self.model.status_id)

	def full_clean(self, exclude = None, validate_unique = True):
		"""
		Validate model fields
		"""
		self.model.full_clean(exclude = exclude, validate_unique = validate_unique)

	@payment_object_permission()
	def save(self, force_insert = False, force_update = False, using = None, update_fields = None):
		"""
		Saves the model instance
		:param update_fields:
		:param using:
		:param force_update:
		:param force_insert:
		"""
		self.model.save(force_insert, force_update, using, update_fields)

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
		super(IncomeTransaction, self).__init__(ITModel)

	def set_data(self, *args, **kwargs):
		"""
		Set model data
		:return:
		"""
		super(IncomeTransaction, self).set_data(*args, **kwargs)
		self.model.value = kwargs.get('value', self.model.value)


class ExpenseTransaction(Transaction):
	def __init__(self):
		"""
		Expense transaction abstraction
		"""
		super(ExpenseTransaction, self).__init__(ETModel)
		self.expense_transaction_items = []

	def set_data(self, *args, **kwargs):
		"""
		Set model data
		"""
		super(ExpenseTransaction, self).set_data(*args, **kwargs)
		self.model.supplier_id = kwargs.get('supplier_id', self.model.supplier_id)

		expense_transaction_items = kwargs.get('expense_items', [])
		for expense_transaction_item in expense_transaction_items:
			model = ExpenseTransactionItem(
				count = expense_transaction_item.get('count', 1),
				expense_item_id = expense_transaction_item.get('expense_item_id', None)
			)
			self.expense_transaction_items.append({'model': model, 'value': expense_transaction_item.get('price', None)})

	def full_clean(self, exclude = None, validate_unique = True):
		"""
		Validate the model
		:param exclude
		:param validate_unique
		"""
		errors = {}
		try:
			super(ExpenseTransaction, self).full_clean()
		except ValidationError as e:
			errors = e.update_error_dict(errors)

		if len(self.expense_transaction_items) == 0:
			errors.setdefault('expense_items', ['Transaction should contain expense item(s)'])

		exclude = 'transaction',
		is_expense_items_valid = True
		for expense_transaction_item in self.expense_transaction_items:
			try:
				expense_transaction_item.get('model').full_clean(exclude)
				value = float(expense_transaction_item.get('value'))
			except (ValidationError, ValueError) as e:
				is_expense_items_valid = False

		if not is_expense_items_valid:
			errors.setdefault('expense_items', ['One or more expense items fields have errors'])

		if errors:
			raise ValidationError(errors)

	def save(self, force_insert = False, force_update = False, using = None, update_fields = None):
		"""
		Saves the model instance
		:param update_fields:
		:param using:
		:param force_update:
		:param force_insert:
		"""
		try:
			super(ExpenseTransaction, self).save(force_insert, force_update, using, update_fields)
		except (PaymentObjectValueError, PaymentObjectLockedError) as e:
			raise TransactionSaveError(e.message)

		try:
			for expense_transaction_item in self.expense_transaction_items:
				model = expense_transaction_item.get('model')
				model.transaction_id = self.model.guid
				model.save()

				register_record = model.create_register_record(expense_transaction_item.get('value'))
				register_record.save()

		except Exception as e:
			self.set_data(status_id = TransactionStatus.objects.get_error_status().guid)
			self.model.save(force_insert, force_update, using, force_update)

			raise TransactionSaveError('The error is occupied during expense items saving')

	def get_total_value(self):
		"""
		Calculates total value of transaction
		:return:
		"""
		value = .0

		for transaction_expense_item in self.expense_transaction_items:
			value += float(transaction_expense_item.get('value'))

		return value
