class ISearchable():
	"""
	Interface to provide searches
	"""
	def search(self, q, *args, **kwargs):
		"""
		Search method
		:return:
		"""
		raise NotImplementedError()
