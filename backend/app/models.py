from . import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Integer)
    score = db.Column(db.Integer)
    username = db.Column(db.String(64), nullable=False)
