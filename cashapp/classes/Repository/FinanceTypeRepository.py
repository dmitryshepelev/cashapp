from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.POTypeModel import POType


class FinanceTypeRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(FinanceTypeRepository, self).__init__(POType)
