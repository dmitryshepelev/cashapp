"""
Django settings for cashapp project.

Generated by 'django-admin startproject' using Django 1.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v2ss9zt__)p!+n@8@%_@a(luz2r&f8_use(3kxu@t*=g(3^tq0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',

	'cashapp',
	'cashapp_models',
	'cashapp_auth',
	'cashapp_my',
	'cashapp_sett',
	'cashapp_api',

	'django_nose',
]

MIDDLEWARE_CLASSES = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'cashapp.middleware.RequestParser.RequestBodyParserMiddleware'
]

ROOT_URLCONF = 'cashapp.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

WSGI_APPLICATION = 'cashapp.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': 'cashappdb_dev',
		'USER': 'postgres',
		'PASSWORD': 'qwaszx@1',
		'HOST': 'localhost',
		'PORT': '5432',
	}
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

DEFAULT_LANGUAGE = 'en'
CURRENT_LANGUAGE = 'en'


TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATICFILES_DIRS = (
	'cashapp/static/css/',
	'cashapp/static/js/',
	'cashapp/static/res/',

	'cashapp_auth/static/js/',

	'cashapp_my/static/js/',

	'cashapp_sett/static/js/',
)

STATIC_URL = '/static/'

TEMPLATE_DIRS = (
	os.path.join(BASE_DIR,  'cashapp/templates'),
	os.path.join(BASE_DIR,  'cashapp_auth/templates'),
	os.path.join(BASE_DIR,  'cashapp_my/templates'),
	os.path.join(BASE_DIR,  'cashapp_sett/templates'),
)

LOGIN_URL = '/auth/'

# Use nose to run all tests
TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

# Tell nose to measure coverage on the 'foo' and 'bar' apps
NOSE_ARGS = [
	'--with-coverage',
	'--cover-package=cashapp,cashapp_auth',
	'--cover-html',
]