venv-setup:
	virtualenv venv
	make venv-activate

venv-install:
	pip install -r requirements.txt

start-gunicorn:
	gunicorn --bind=0.0.0.0:5000 wsgi:app
