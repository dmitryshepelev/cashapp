class FinanceItem(object):
	def __init__(self, **kwargs):
		self.__is_locked = kwargs.get('is_locked', False)
		self.__currency = kwargs.get('currency')
		self.__user_id = int(kwargs.get('user_id'))
		self.__type_id = int(kwargs.get('type_id'))
		self.__balance = kwargs.get('balance')
		self.__name = kwargs.get('name', 'card') if self.__type_id == 1 else None