from django.contrib.auth.models import User
from cashapp.libs.Repository.RepositoryBase import RepositoryBase


class UserRepository(RepositoryBase):
	"""
	Concrete repository
	"""
	def __init__(self):
		super(UserRepository, self).__init__(User)

	def create(self, **kwargs):
		"""
		User creation method. Base method needs to be overridden because of password encrypting
		:param kwargs: fields
		:return: User instance
		"""
		user = self.e_type.objects.create_user(**kwargs)
		return user
