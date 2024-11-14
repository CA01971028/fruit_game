from flask import Flask, redirect, url_for, render_template, request, session , jsonify
from flask import redirect
from flask import url_for;
from flask_mysqldb import MySQL
from datetime import timedelta 
from flask_cors import CORS
from cryptography.fernet import Fernet
import os

app = Flask(__name__)

app.secret_key = 'abcdefghijklmn'
app.permanent_session_lifetime = timedelta(minutes=5)

CORS(app)

# MySQL接続情報を設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
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
    # return jsonify(name=scores_list)
    return 'Hello'
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'name': 'tarou', 'age': 30, 'job': 'developer'}
    return jsonify(data)
# スコアの表示
@app.route('/api/data/scores',methods=['GET'])
def get_scores():
    cur = mysql.connection.cursor()
    #SELECT文でscoreのみを取得
    cur.execute("select score from scores order by score desc limit 3;")
    data = cur.fetchall()
    cur.close()
    
    scores = [row[0] for row in data]
    return jsonify(scores = scores)
@app.route('/api/data/best',methods=['GET'])
def get_score():
    cur = mysql.connection.cursor()
    #SELECT文でscoreのみを取得
    cur.execute("SELECT MAX(score) AS max_score FROM scores;")
    data = cur.fetchall()
    cur.close()
    # score = 
    return jsonify(score = data)
# @app.route('/api/data/test',methods=['GET'])
# def get_dbdata():
#     cur = mysql.connection.cursor()
#     # SELECT文でscoreのみを取得
#     cur.execute("SELECT score FROM scores")
#     data = cur.fetchall()
#     cur.close()
    
#     scores = [row[0] for row in data]
#     return jsonify(scores=scores)


# フロントエンドでサインインを押された際にinputデータ１，２を取得し、true,false判別
@app.route('/submit',methods=['POST'])
def submit():
    data = request.json
    # print(data['data'][1])#フロントエンドからの値を表示
    {'success': False}
    if request.method == 'POST':
        user = data['data'][0]
        pw = data['data'][1]
        
        cur = mysql.connection.cursor()
        # SELECT文でscoreのみを取得
        cur.execute("SELECT pass, user_key FROM users where name = %s ",(user,))
        data2 = cur.fetchall()
        cur.close()
        # print(data2[0][1])
        # print(data2[0][1])
        # input_encrypted_password = Fernet(data2[0][1]).encrypt(pw.encode())
        # print(input_encrypted_password)
        decrypted_password = Fernet(data2[0][1]).decrypt(data2[0][0])
        decrypted_password_str = decrypted_password.decode()
        print(decrypted_password_str)
        if decrypted_password_str == pw:
            print("true")
        else:
            print("false")
        # if Fernet(key).decrypt(pw.password) == data2[0]:
        #     return '成功'
        # else:
        #     return  '失敗'
        if data2:
            if decrypted_password_str == pw:
                session.permanent = True
                session['id'] = user
                return  jsonify({'success': True,'name':user}),200
            else:
                return  jsonify({'success': False}),201
        else:
            return  jsonify({'success': False}),201
# フロントエンドでサインアップを押された場合にinput1,2データを取得
@app.route('/submit/add',methods=['POST'])
def submit_add():
    # キー生成
    key = Fernet.generate_key()
    cur = mysql.connection.cursor()
    data = request.json
    {'success': False}
    user = data['data'][0]
    pw = data['data'][1]
    encrypted_password = Fernet(key).encrypt(pw.encode())
    cur.execute('INSERT INTO users(name, pass, user_key) VALUES(%s, %s, %s)', (user, encrypted_password, key))
    mysql.connection.commit()
    if cur.rowcount == 1:
        return jsonify({'success': True, 'name': user}), 200
    else:
        return jsonify({'success': False}), 210

@app.route('/score', methods=['POST'])
def push():
    cur = mysql.connection.cursor()
    data = request.json
    score = data['data'][0]
    if(score <= 30000 or score % 2 == 0):
        {'success': False}
        print(data['data'][0])
        # return jsonify({'success': True, 'name': score}), 200
        cur.execute('INSERT INTO scores(user_id,score) VALUES(%s, %s)', (data['data'][1],data['data'][0]))
        mysql.connection.commit()
        if cur.rowcount == 1:
            return jsonify({'success': True, 'score': data['data'][0]}), 200
        else:
            return jsonify({'success': False}), 210
    else:
        return jsonify({'success': False}), 211

    
    
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