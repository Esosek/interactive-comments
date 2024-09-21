import graphene
from .queries import UserType, CommentType
from .mutations import AddComment, RemoveComment, UpdateComment, SetVote
from ..models import Comment, User


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.ID(required=True))
    comments = graphene.List(CommentType)

    def resolve_user(self, _, id):
        return User.query.get(id)

    def resolve_comments(self, _):
        return Comment.query.all()


class Mutation(graphene.ObjectType):
    add_comment = AddComment.Field()
    remove_comment = RemoveComment.Field()
    update_comment = UpdateComment.Field()
    set_vote = SetVote.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
