from collections import namedtuple

from django.db import connection

from cashapp_models.managers.TransactionModelBaseManager import TransactionModelBaseManager
from cashapp_models.models.TransactionStatusModel import TransactionStatus


class ExpenseTransactionManager(TransactionModelBaseManager):
	"""
	Concrete class manager
	"""
	def get_aggregated_by_days(self, payment_object):
		"""
		Overrides base class method
		:param payment_object:
		:return:
		"""
		status = TransactionStatus.objects.get_success_status()

		with connection.cursor() as c:
			c.execute(
				'SELECT * FROM get_expense_transactions_aggregated_by_days(%s, %s)',
				[payment_object.guid, status.guid]
			)

			desc = c.description
			aggregated_transaction = namedtuple('AggregatedTransaction', [col[0] for col in desc])

			return [aggregated_transaction(*row) for row in c.fetchall()]
