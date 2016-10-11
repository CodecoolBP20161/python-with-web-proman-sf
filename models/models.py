from peewee import *
from connect_db import db


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    pass


class Card(BaseModel):
    pass
