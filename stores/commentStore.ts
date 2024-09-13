import { create } from 'zustand'
import { nanoid } from 'nanoid'

import commentData from 'data.json'
import { type UserComment } from '@/types/userComment'
import { useUserStore } from './userStore'

type CommentStoreType = {
  comments: UserComment[]
  computed: {
    parentComments: () => UserComment[]
    replies: (parentId: string) => UserComment[]
    score: (commentId: string) => number
  }
  addComment: (commentText: string, parentCommentId?: string) => void
  deleteComment: (commentId: string) => void
  editComment: (commentId: string, updatedText: string) => void
  upvoteComment: (commentId: string) => void
  downvoteComment: (commentId: string) => void
}

export const useCommentStore = create<CommentStoreType>((set, get) => {
  const loggedUser = useUserStore.getState().loggedUser

  function createComment(
    commentText: string,
    commentParentId?: string
  ): UserComment {
    return {
      id: nanoid(),
      parentId: commentParentId,
      content: commentText,
      createdAt: 'now',
      score: 0,
      user: loggedUser!,
    }
  }

  return {
    comments: commentData.comments,
    computed: {
      parentComments: () => get().comments.filter((c) => !c.parentId),
      replies: (parentId) =>
        get().comments.filter((c) => c.parentId === parentId),
      score: (commentId) =>
        get().comments.find((c) => c.id === commentId)?.score ?? 0,
    },
    addComment: (commentText, parentCommentId) => {
      set((state) => {
        const createdComment = createComment(commentText, parentCommentId)
        return { comments: [...state.comments, createdComment] }
      })
    },
    deleteComment: (commentId) => {
      set((state) => ({
        comments: state.comments.filter((c) => c.id !== commentId),
      }))
    },
    // TODO: Implement editComment
    editComment: (commentId, updatedCommentText) => {},
    upvoteComment: (commentId) => {
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId ? { ...c, score: c.score + 1 } : c
        ),
      }))
    },
    downvoteComment: (commentId) => {
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId ? { ...c, score: c.score - 1 } : c
        ),
      }))
    },
  }
})
