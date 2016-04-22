import hashlib
import json
import random
from ast import literal_eval
from collections import defaultdict

from django.core import serializers
from django.db import models


class ModelBase(models.Model):
	guid = models.CharField(max_length = 40, db_index = True, unique = True)
	exist = models.BooleanField(default = True)

	class Meta:
		abstract = True

	def natural_key(self, *args, **kwargs):
		"""
		Returns natural key to serialize
		if {args} is specified, dicts are merged
		:return: {dict}
		"""
		default_keys = {'guid': self.guid}
		natural_keys = defaultdict(set)

		for d in args + (default_keys,):
			for key, value in d.iteritems():
				natural_keys[key] = value

		return natural_keys

	def serialize(self, format = 'json', include_fields = (), exclude_fields = (), use_natural_foreign_keys = True,
					use_natural_primary_keys = True):
		"""
		Serialize object
		:param format: format to serialize
		:param include_fields: fields to include. All fields are serialized by default
		:param exclude_fields: fields to exclude. 'exist' field is excluded by default
		:param use_natural_primary_keys:
		:param use_natural_foreign_keys:
		:return:
		"""
		options = {
			'use_natural_foreign_keys': use_natural_foreign_keys,
			'use_natural_primary_keys': use_natural_primary_keys
		}

		if include_fields:
			options['fields'] = include_fields

		serialized = json.loads(
			serializers.serialize(format, [self], **options))

		serialized = serialized[0].get('fields', {})

		exclude_fields = tuple(set(exclude_fields) | {'exist'})
		for key in exclude_fields:
			if key in serialized.keys():
				serialized.__delitem__(key)

		return serialized

	def save(self, force_insert = False, force_update = False, using = None, update_fields = None):
		"""
		Overrides base save method
		:param force_insert:
		:param force_update:
		:param using:
		:param update_fields:
		:return:
		"""
		if not self.guid:
			self.guid = hashlib.sha1(str(random.random())).hexdigest()

		super(ModelBase, self).save(force_insert, force_update, using, update_fields)
