from django.db import models
from django.db.models import Q


class ExpenseItemManager(models.Manager):
	"""
	ExpenseItem model manager
	"""
	def search(self, q, *args, **kwargs):
		"""
		Implementation search method
		:param q:
		:param args:
		:param kwargs:
		:return:
		"""
		user_name = 'user'
		if user_name in kwargs.keys():
			kwargs.__setitem__('owner', kwargs.get(user_name))
			del kwargs[user_name]

		query = Q(name__icontains = q) | Q(category__name__icontains = q)
		return self.filter(query, **kwargs)
