import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from .models import Comment, User


class UserType(SQLAlchemyObjectType):
    class Meta:
        model = User


class CommentType(SQLAlchemyObjectType):
    class Meta:
        model = Comment

    user = graphene.Field(UserType)

    def resolve_user(self, _):
        return self.user


class Query(graphene.ObjectType):
    comments = graphene.List(CommentType)

    def resolve_comments(self, _):
        return Comment.query.all()


schema = graphene.Schema(query=Query)
