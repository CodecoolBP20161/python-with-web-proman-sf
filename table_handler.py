from models import Card, Board


# template class
class TableHandler:
    def __init__(self, table):
        self.table = table

    def save_data(self):
        raise NotImplementedError

    def delete_data(self):
        raise NotImplementedError

    def get_data_by_filter(self):
        raise NotImplementedError

    def modify_data(self, data_id, attribute, value):
        object_to_modify = self.table.select().where(self.table.id == data_id)
        object_to_modify.attribute = value
        object_to_modify.save()

    def get_all_data(self):
        return [i for i in self.table.select()]


class BoardHandler(TableHandler):
    def __init__(self):
        super().__init__(Board)

    def save_data(self, input_dict):
        self.table.create(**input_dict)

    def delete_data(self, data_id):
        self.table.delete_instance().where(self.table.id == data_id)

    def get_data_by_filter(self):
        pass


class CardHandler(TableHandler):
    def __init__(self):
        super().__init__(Card)

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
