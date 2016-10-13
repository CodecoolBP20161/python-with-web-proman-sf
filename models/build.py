# build tables
import sys
import os
rel_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(rel_path)

from connect_db import db
from models import Board, Card

db.connect()

db.drop_tables([Board, Card], safe=True)
db.create_tables([Board, Card], safe=True)