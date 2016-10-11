# build tables
from connect_db import db

db.connect()

db.drop_tables([Board, Card], safe=True)
db.create_tables([Board, Card], safe=True)