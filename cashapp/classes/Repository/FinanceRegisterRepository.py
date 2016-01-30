from cashapp.classes.Repository.RepositoryBase import RepositoryBase
from cashapp_models.models.PORegisterModel import PORegister


class FinanceRegisterRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(FinanceRegisterRepository, self).__init__(PORegister)
