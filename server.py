from flask import Flask, render_template, jsonify, redirect, url_for, request
from connect_db import db
from table_handler import BoardHandler, CardHandler

app = Flask('ProMan')

board_handler = BoardHandler()
card_handler = CardHandler()


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/api/<table>/<id>', methods=['POST', 'PUT', 'DELETE'])
def modify_data(table, id):
    pass


@app.route('/api/boards/<data_id>', methods=['GET'])
def get_cards(data_id):
    cards = card_handler.get_data_by_filter('board', data_id)
    cards_in_dict = [{'id': str(i.id), 'title': i.title} for i in cards]
    board = board_handler.get_data_by_filter('id', data_id)
    response = [{'id': str(i.id), 'title': i.title, 'cards': cards_in_dict} for i in board]
    return jsonify(*response)


@app.route('/api/boards/', methods=['GET'])
def get_boards():
    boards = board_handler.get_all_data()
    boards_in_dict = [{'id': str(i.id), 'title': i.title} for i in boards]
    return jsonify(boards_in_dict)


@app.route('/api/boards/<id_to_delete>', methods=['DELETE'])
def delete_board(id_to_delete):
    all_cards = card_handler.get_data_by_filter('board', id_to_delete)
    for card in all_cards:
        card_handler.delete_data(card.id)
    board_handler.delete_data(id_to_delete)
    return redirect(url_for('get_boards'))


@app.route('/api/cards/<id_to_delete>', methods=['DELETE'])
def delete_card(id_to_delete):
    card_handler.delete_data(id_to_delete)
    return 'successfully deleted card'


@app.route('/api/board-save', methods=['POST'])
def add_board():
    board_handler.save_data(request.json)
    return redirect(url_for('get_boards'))


@app.route('/api/card-save', methods=['POST'])
def add_cards():
    card_handler.save_data(request.json)
    return 'successfully added new card'


@app.route('/api/cards/modify-entry', methods=['PUT'])
def modify_card():
    card_handler.modify_data(request.json["id"], request.json["attribute"], request.json["value"])
    return 'successfully modified card'

if __name__ == '__main__':
    app.run(host='0.0.0.0')
