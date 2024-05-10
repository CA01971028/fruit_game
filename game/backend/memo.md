```
py -3 -m venv venv
venv\Scripts\activate
pip install Flask

$env:FLASK_APP = "hello"
flask run
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "1"
```