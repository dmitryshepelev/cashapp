from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.CurrencyModel import Currency


class CurrencyRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(CurrencyRepository, self).__init__(Currency)