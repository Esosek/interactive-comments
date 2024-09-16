import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from .models import Comment


class CommentType(SQLAlchemyObjectType):
    class Meta:
        model = Comment


class Query(graphene.ObjectType):
    comments = graphene.List(CommentType)

    def resolve_comments(self, _):
        return Comment.query.all()


schema = graphene.Schema(query=Query)
