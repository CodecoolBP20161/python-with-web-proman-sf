from models import Card, Board

# te
# mplate class
class TableHandler():
    def save_data(self):
        pass

    def delete_data(self):
        pass

    def get_data_by_filter(self):
        pass

    def modify_data(self):
        pass

    def get_all_data(self):
        pass


class BoardHandler(TableHandler):
    pass


class CardHandler(TableHandler):
    def __init__(self):
        self.table = Card

    def save_data(self, input_dict):
        local_dict = {}
        for key in input_dict:
            if key == 'board':
                local_dict['board'] = Board.select().where(Board.id == input_dict['board'])
            else:
                local_dict[key] = input_dict[key]
        self.table.create(**local_dict)

    def delete_data(self, id):
        self.table.delete().where(self.table.id == id)
