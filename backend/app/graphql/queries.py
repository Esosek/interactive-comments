import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from ..models import Comment, User, Vote


class VoteType(SQLAlchemyObjectType):
    class Meta:
        model = Vote


class UserType(SQLAlchemyObjectType):
    class Meta:
        model = User

    votes = graphene.List(VoteType)

    def resolve_votes(self, _):
        return self.votes


class CommentType(SQLAlchemyObjectType):
    class Meta:
        model = Comment

    user = graphene.Field(UserType)
    total_votes = graphene.Int()

    def resolve_user(self, _):
        return self.user

    def resolve_total_votes(self, _):
        upvotes = Vote.query.filter_by(comment_id=self.id, vote_type=True).count()
        downvotes = Vote.query.filter_by(comment_id=self.id, vote_type=False).count()
        return upvotes - downvotes
