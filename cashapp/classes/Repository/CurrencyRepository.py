from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.CurrencyModel import Currency


class CurrencyRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(CurrencyRepository, self).__init__(Currency)

	def get_by_code(self, code):
		"""
		Get currency instance by code
		:return: Currency instance
		"""
		return self.e_type.objects.get(code=code)