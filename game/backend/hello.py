from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    return '<p>Hello Flask</p>'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'name': 'tarou', 'age': 30, 'job': 'developer'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)