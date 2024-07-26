import { create } from "zustand";
import { CommentStoreType, createCommentStore } from "./commentStore";
import { createUserStore, UserStoreType } from "./userStore";

export const useStore = create<CommentStoreType & UserStoreType>((set) => ({
  ...createCommentStore(set),
  ...createUserStore(set),
}));
