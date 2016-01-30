from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.POModel import PaymentObject


class FinanceRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(FinanceRepository, self).__init__(PaymentObject)
