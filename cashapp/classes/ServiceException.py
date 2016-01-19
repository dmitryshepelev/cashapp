class ServiceException(Exception):
	"""
	Service exception base class
	"""
	def __init__(self, msg=''):
		self.message = msg