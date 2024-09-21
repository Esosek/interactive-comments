import graphene
from graphql import GraphQLError

from datetime import datetime

from .. import db
from ..models import Comment, Vote
from .queries import CommentType, VoteType


class AddComment(graphene.Mutation):
    class Arguments:
        parent_id = graphene.ID(required=False)
        content = graphene.String()
        user_id = graphene.ID()
        replying_to = graphene.String(required=False)

    ok = graphene.Boolean()
    comment = graphene.Field(lambda: CommentType)

    def mutate(self, _, content, user_id, parent_id=None, replying_to=None):
        # TODO: Validate comment fields before updating
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


class UpdateComment(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        user_id = graphene.ID()
        content = graphene.String()
        replying_to = graphene.String(required=False)

    ok = graphene.Boolean()

    def mutate(self, _, id, user_id, content, replying_to=None):
        comment = Comment.query.get(id)

        if not comment:
            raise GraphQLError(f"Comment with id {id} not found")

        if comment.user_id is not user_id:
            raise GraphQLError(f"User id {user_id} does NOT author comment id {id}")

        # TODO: Validate content before updating

        comment.content = content
        comment.replying_to = replying_to
        db.session.commit()
        return UpdateComment(ok=True)


class SetVote(graphene.Mutation):
    class Arguments:
        comment_id = graphene.ID()
        user_id = graphene.ID()
        vote_type = graphene.Argument(graphene.Boolean, required=False)

    ok = graphene.Boolean()
    vote = graphene.Field(lambda: VoteType)

    def mutate(self, _, comment_id, user_id, vote_type=None):
        vote = Vote.query.filter_by(user_id=user_id, comment_id=comment_id).first()

        if vote:
            # Remove vote if vote_type is None
            if vote_type is None:
                db.session.delete(vote)
                vote = None
            else:
                # Prevent voting the same vote type again
                if vote.vote_type == vote_type:
                    raise GraphQLError(
                        f"Vote for commentId {comment_id} from userId {user_id} already exists with requested vote_type."
                    )
                # Update the vote type
                vote.vote_type = vote_type
        else:
            # Create a new vote if it doesn't exist
            if vote_type is not None:
                vote = Vote(vote_type=vote_type, comment_id=comment_id, user_id=user_id)
                db.session.add(vote)
            else:
                raise GraphQLError("Cannot create a new vote without a vote_type.")

        db.session.commit()
        return SetVote(vote=vote, ok=True)
