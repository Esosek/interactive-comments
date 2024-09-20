from . import db
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean


class Comment(db.Model):
    id = Column(Integer, primary_key=True)
    content = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False)
    replying_to = Column(String(64))
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    parent_id = Column(String, ForeignKey("comment.id"), nullable=True)
    votes = db.relationship(
        "Vote", backref="comment", lazy=True, cascade="all, delete-orphan"
    )


class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    image = Column(String(255), nullable=False)
    comments = db.relationship("Comment", backref="user", lazy=True)
    votes = db.relationship(
        "Vote", backref="user", lazy=True, cascade="all, delete-orphan"
    )


class Vote(db.Model):
    id = Column(Integer, primary_key=True)
    vote_type = Column(Boolean, nullable=False)
    comment_id = Column(Integer, ForeignKey("comment.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
