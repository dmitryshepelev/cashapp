from collections import namedtuple

from django.db.models import Sum

from cashapp_models.managers.TransactionModelBaseManager import TransactionModelBaseManager


class IncomeTransactionManager(TransactionModelBaseManager):
	"""
	Concrete class manager
	"""
	def get_aggregated_by_days(self, payment_object):
		"""
		Overrides base class method
		:param payment_object:
		:return:
		"""
		aggregated_transaction = namedtuple('AggregatedTransaction', ['date', 'value'])
		return [aggregated_transaction(**row) for row in self.get_po_associated(payment_object).extra({'date': 'date(date)'}).values('date').annotate(value=Sum('value'))]
