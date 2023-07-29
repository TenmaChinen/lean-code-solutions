import django, os, sys

sys.path.append('../..')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()