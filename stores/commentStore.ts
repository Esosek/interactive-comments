import { create } from "zustand";

import commentData from "data.json";
import { type UserComment } from "@/types/userComment";

type CommentStoreType = {
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

export const useCommentStore = create<CommentStoreType>((set) => ({
  // TODO: Implement userCommentStore methods
  comments: commentData.comments,
  addComment: (commentId, parentCommentId = null) => {},
  deleteComment: (commentId, loggedUser) => {},
  editComment: (commentId, loggedUser, updatedComment) => {},
  upvoteComment: (commentId, loggedUser) => {},
  downvoteComment: (commentId, loggedUser) => {},
}));
