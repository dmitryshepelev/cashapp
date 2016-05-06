from cashapp.libs.DateTimeUtil import DateTimeUtil
from cashapp_models.models.IncomeTransactionModel import IncomeTransaction as ITModel
from cashapp_my.forms.IncomeTransactionForm import IncomeTransactionForm


class Transaction(object):
	def __init__(self, model, form, data):
		self.data = data
		self.model = model
		self.form = form(self.data)

	@staticmethod
	def create(transaction_type, data):
		"""
		Creates concrete Transaction
		:param transaction_type:
		:return:
		"""
		transaction_map = {
			'income': IncomeTransaction
		}
		return transaction_map.get(transaction_type)(data)


class IncomeTransaction(Transaction):
	def __init__(self, data):
		"""
		Income Transaction abstraction
		"""
		super(IncomeTransaction, self).__init__(ITModel, IncomeTransactionForm, data)

	def create_model_instance(self, user):
		"""
		Create model instance
		:param user:
		:return:
		"""
		model = self.model(
			value = self.form['value'].data,
			description = self.form['description'].data,
			date = DateTimeUtil.from_timestamp(self.form['date'].data),
			user_id = user.pk,
			payment_object_id = self.form['payment_object_id'].data,
		)
		return model
