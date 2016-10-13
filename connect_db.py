from peewee import PostgresqlDatabase
from config import Config


def singleton(my_class):
    instances = {}

    def getinstance():
        if my_class not in instances:
            instances[my_class] = my_class()
        return instances[my_class]
    return getinstance


@singleton
class DataBase():

    def __init__(self):
        self.database = Config.load("database")
        self.user = Config.load("database_user")
        self.password = Config.load("database_password")
        self.port = Config.load("port")
        self.host = Config.load("host")

    def connect(self):
        return PostgresqlDatabase(self.database, user=self.user, password=self.password, port=self.port, host=self.host)


my_database = DataBase()
db = my_database.connect()
