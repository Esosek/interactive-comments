import { type UserComment } from "@/types/userComment";

import commentData from "data.json";

export type CommentStoreType = {
  comments: UserComment[];
  addComment: (comment: UserComment, parentCommentId?: number | null) => void;
  deleteComment: (commentId: number, loggedUser: number) => void;
  editComment: (
    commentId: number,
    loggedUser: number,
    updatedComment: UserComment
  ) => void;
  upvoteComment: (commentId: number, loggedUser: number) => void;
  downvoteComment: (commentId: number, loggedUser: number) => void;
};

type SetState = (
  partial:
    | Partial<CommentStoreType>
    | ((state: CommentStoreType) => CommentStoreType),
  replace?: boolean
) => void;

export const createCommentStore = (set: SetState): CommentStoreType => ({
  // TODO: Implement userCommentStore methods
  comments: commentData.comments,
  addComment: (commentId, parentCommentId = null) => {},
  deleteComment: (commentId, loggedUser) => {},
  editComment: (commentId, loggedUser, updatedComment) => {},
  upvoteComment: (commentId, loggedUser) => {},
  downvoteComment: (commentId, loggedUser) => {},
});
