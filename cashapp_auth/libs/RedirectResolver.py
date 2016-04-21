class RedirectResolver(object):
	"""

	"""

	def __init__(self, request):
		"""
		Constrictor
		:param request: HTTP request
		:return:
		"""
		self.__request = request

	def get_auth_redirect_url(self):
		"""
		Returns url to redirect after auth
		:return: {str}
		"""
		data = self.__request.body_data
		redirect_url = data.get('redirect_url', None)

		redirect_url = {
			'redirect_url': redirect_url or ('/admin/' if self.__request.user.is_superuser else (
				'/my/' if self.__request.user.is_active else '/blocked/')) if self.__request.user.is_authenticated() else '/auth/'
		}

		return redirect_url
