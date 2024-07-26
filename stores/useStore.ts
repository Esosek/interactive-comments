import { create } from "zustand";
import { CommentSliceType, createCommentSlice } from "./commentSlice";
import { createUserSlice, UserSliceType } from "./userSlice";

export const useStore = create<CommentSliceType & UserSliceType>((set) => ({
  ...createCommentSlice(set),
  ...createUserSlice(set),
}));
