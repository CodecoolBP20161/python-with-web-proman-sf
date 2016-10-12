from peewee import PostgresqlDatabase
from config import Config


def singleton(cls):
    instances = {}

    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance


@singleton
class DataBase():

    def __init__(self):
        self.database = Config.load("database")
        self.user = Config.load("database_user")
        self.password = Config.load("database_password")

    def connect(self):
        return PostgresqlDatabase(self.database, user=self.user, password=self.password)

my_database = DataBase()
db = my_databse.connect()
