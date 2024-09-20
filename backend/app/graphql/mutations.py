import graphene
from graphql import GraphQLError

from datetime import datetime

from .. import db
from ..models import Comment
from .queries import CommentType


class AddComment(graphene.Mutation):
    class Arguments:
        parent_id = graphene.ID(required=False)
        content = graphene.String()
        user_id = graphene.ID()
        replying_to = graphene.String(required=False)

    ok = graphene.Boolean()
    comment = graphene.Field(lambda: CommentType)

    def mutate(self, _, content, user_id, parent_id=None, replying_to=None):
        comment = Comment(
            parent_id=parent_id,
            content=content,
            created_at=datetime.now(),
            user_id=user_id,
            replying_to=replying_to,
        )

        db.session.add(comment)
        db.session.commit()

        return AddComment(comment=comment, ok=True)


class RemoveComment(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        user_id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(self, _, id, user_id):
        comment = Comment.query.get(id)

        if not comment:
            raise GraphQLError(f"Comment with id {id} not found")

        if comment.user_id is not user_id:
            raise GraphQLError(f"User id {user_id} does NOT author comment id {id}")

        db.session.delete(comment)
        db.session.commit()

        return RemoveComment(ok=True)
