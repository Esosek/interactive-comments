import { type UserComment } from "@/types/userComment";

import commentData from "data.json";

export type CommentSliceType = {
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
    | Partial<CommentSliceType>
    | ((state: CommentSliceType) => CommentSliceType),
  replace?: boolean
) => void;

export const createCommentSlice = (set: SetState): CommentSliceType => ({
  // TODO: Implement userCommentStore methods
  comments: commentData.comments,
  addComment: (commentId, parentCommentId = null) => {},
  deleteComment: (commentId, loggedUser) => {},
  editComment: (commentId, loggedUser, updatedComment) => {},
  upvoteComment: (commentId, loggedUser) => {},
  downvoteComment: (commentId, loggedUser) => {},
});
