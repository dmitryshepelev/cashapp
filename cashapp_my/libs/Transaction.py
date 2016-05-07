from cashapp.libs.DateTimeUtil import DateTimeUtil
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction as ITModel
from cashapp_my.forms.IncomeTransactionForm import IncomeTransactionForm


class Transaction(object):
	def __init__(self, model, form):
		self.__data = None
		self.__model = model
		self.__form = form

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
	def form(self):
		return self.__form(self.data)

	def create_model_instance(self, user):
		"""
		Creates model instance
		:param user:
		:return:
		"""
		pass

	@staticmethod
	def create(transaction_type):
		"""
		Creates concrete Transaction
		:param transaction_type:
		:return:
		"""
		transaction_map = {
			'income': IncomeTransaction
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
		return model
