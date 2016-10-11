from peewee import *
from connect_db import db


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    title = CharField()
    board = ForeignKeyField(Board, related_name='boards')
