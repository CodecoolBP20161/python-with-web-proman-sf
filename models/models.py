from peewee import *
from connect_db import db


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    title = CharFiled()


class Card(BaseModel):
    title = Charfield()
    board = ForeignKeyField(Board, related_name='boards')
