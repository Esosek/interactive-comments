import graphene
from .. import db
from ..models import Comment
from .queries import CommentType
from datetime import datetime


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
