from flask import Flask, render_template, jsonify
from table_handler import BoardHandler, CardHandler

app = Flask('ProMan')


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/api/<table>/<id>', methods=['POST', 'PUT', 'DELETE'])
def modify_data(table, id):
    pass


@app.route('/api/boards/<data_id>', methods=['GET'])
def get_cards(data_id):
    card_handler = CardHandler()
    cards = card_handler.get_data_by_filter('board', data_id)
    cards_in_dict = [{'id': str(i.id), 'title': i.title} for i in cards]

    board_handler = BoardHandler()
    board = board_handler.get_data_by_filter('id', data_id)
    response = [{'id': str(i.id), 'title:': i.title, 'cards': cards_in_dict} for i in board]

    return jsonify(*response)


@app.route('/api/boards/', methods=['GET'])
def get_boards():
    board_handler = BoardHandler()
    boards = board_handler.get_all_data()
    boards_in_dict = [{'id': str(i.id), 'title': i.title} for i in boards]
    return jsonify(boards_in_dict)


if __name__ == '__main__':
    app.run()