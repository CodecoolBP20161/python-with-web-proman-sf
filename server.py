from flask import Flask, render_template


app = Flask('ProMan')


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/api/<table>/<id>', methods=['POST', 'PUT', 'DELETE'])
def modify_data(table, id):
    pass


@app.route('/api/boards/<id>', methods=['GET'])
def get_data(id):
    pass


if __name__ == '__main__':
    app.run()