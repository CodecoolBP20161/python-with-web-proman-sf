from flask import Flask, render_template
from peewee import *
from models import*
import models.connect_db


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


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request():
    db.close()


def connection_to_db(db):
    return db


if __name__ == '__main__':
    app.run()
