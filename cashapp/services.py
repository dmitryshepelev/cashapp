from cashapp.libs.ServiceResult import ServiceResult


def generate_ui_tab_collection(tab_values):
	"""
	Generate ui tabs collection
	:param tab_values: teb values
	:return: ServiceResult instance
	"""
	result = ServiceResult()

	keys = ['heading', 'toState', 'show', 'active']

	result.data = {
		'tabs': [dict(zip(keys, tab_val)) for tab_val in tab_values]
	}
	return result