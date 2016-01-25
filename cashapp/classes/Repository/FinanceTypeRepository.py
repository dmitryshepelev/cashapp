from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.FinanceTypeModel import FinanceType


class FinanceTypeRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(FinanceTypeRepository, self).__init__(FinanceType)
