from . import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Integer)
    replying_to = db.Column(db.String(64))
    user_id = db.Column(db.String, db.ForeignKey("user.id"), nullable=False)
    parent_id = db.Column(db.String, db.ForeignKey("comment.id"), nullable=True)
    votes = db.relationship("Vote", backref="comment", lazy=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    comments = db.relationship("Comment", backref="user", lazy=True)
    votes = db.relationship("Vote", backref="user", lazy=True)


class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vote_type = db.Column(db.Boolean, nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
