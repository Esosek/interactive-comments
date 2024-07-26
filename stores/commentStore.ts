import { type UserComment } from "@/types/userComment";
import { create } from "zustand";

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

const userCommentStore = create<CommentStoreType>((set) => ({
  // TODO: Implemnet userCommentStore
  comments: [],
  addComment: (commentId, parentCommentId = null) => {},
  deleteComment: (commentId, loggedUser) => {},
  editComment: (commentId, loggedUser, updatedComment) => {},
  upvoteComment: (commentId, loggedUser) => {},
  downvoteComment: (commentId, loggedUser) => {},
}));
