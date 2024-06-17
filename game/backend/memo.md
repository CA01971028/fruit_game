```
py -3 -m venv venv
venv\Scripts\activate
pip install Flask
pip install flask_mysqldb
pip install flask-cors
pip install cryptography

$env:FLASK_APP = "hello"
flask run
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "1"
drop table scores;
drop table users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    user_key VARCHAR(255) 
);
CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

```