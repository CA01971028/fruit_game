from flask import Flask, redirect, url_for, render_template, request, session , jsonify
from flask import redirect
from flask import url_for;
from flask_mysqldb import MySQL
from datetime import timedelta 
from flask_cors import CORS



app = Flask(__name__)

app.secret_key = 'abcdefghijklmn'
app.permanent_session_lifetime = timedelta(minutes=5)

CORS(app)

# MySQL接続情報を設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'jugon'
app.config['MYSQL_PASSWORD'] = '85208520'
app.config['MYSQL_DB'] = 'fruit'

mysql = MySQL(app)

@app.route('/', methods=['GET'])
def index():
    cur = mysql.connection.cursor()
    # SELECT文でscoreのみを取得
    cur.execute("SELECT score FROM scores where id = 1")
    data = cur.fetchall()
    cur.close()
    
    # scoreのみを含むリストを作成
    scores_list = [row for row in data]
    
    # JSON形式でレスポンスを返す
    return jsonify(name=scores_list)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'name': 'tarou', 'age': 30, 'job': 'developer'}
    return jsonify(data)
# スコアの表示
@app.route('/api/data/test',methods=['GET'])
def get_dbdata():
    cur = mysql.connection.cursor()
    # SELECT文でscoreのみを取得
    cur.execute("SELECT score FROM scores")
    data = cur.fetchall()
    cur.close()
    
    scores = [row[0] for row in data]
    return jsonify(scores=scores)

@app.route('/submit',methods=['POST'])
def submit():
    data = request.json
    print(data['data'][1])#フロントエンドからの値を表示
    {'success': False}
    if request.method == 'POST':
        user = data['data'][0]
        pw = data['data'][1]
        cur = mysql.connection.cursor()
        # SELECT文でscoreのみを取得
        cur.execute("SELECT id FROM users where name = %s AND pass = %s",(user,pw))
        data2 = cur.fetchall()
        cur.close()
        if data2:
            session.permanent = True
            session['id'] = user
            return  jsonify({'success': True,'name':user}),200
        else:
            return  jsonify({'success': False}),200

# 名前の表示
@app.route('/api/data/name',methods = ['GET'])
def get_dbname():

    cur = mysql.connection.cursor()
    # SELECT文でscoreのみを取得
    cur.execute("SELECT name FROM users ")
    data = cur.fetchall()
    cur.close()
    
    name = [row[0] for row in data]
    return jsonify(name=name)



        
        


@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('hello'))



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)