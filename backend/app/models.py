from . import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Integer)
    # score = db.Column(db.Integer) will be moved to separate table
    replying_to = db.Column(db.String(64), nullable=True)
    user_id = db.Column(db.String, db.ForeignKey("user.id"), nullable=False)
    parent_id = db.Column(db.String, db.ForeignKey("comment.id"), nullable=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    comments = db.relationship("Comment", backref="user", lazy=True)
