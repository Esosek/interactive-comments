import { create } from 'zustand'
import { nanoid } from 'nanoid'

import commentData from 'data.json'
import { type UserComment } from '@/types/userComment'
import { useUserStore } from './userStore'

type CommentStoreType = {
  comments: UserComment[]
  addComment: (commentText: string, parentCommentId?: string) => void
  deleteComment: (commentId: string, parentCommentId?: string) => void
  editComment: (commentId: string, updatedComment: UserComment) => void
  upvoteComment: (commentId: string) => void
  downvoteComment: (commentId: string) => void
}

export const useCommentStore = create<CommentStoreType>((set) => {
  const loggedUser = useUserStore.getState().loggedUser

  function createComment(commentText: string): UserComment {
    return {
      id: nanoid(),
      content: commentText,
      createdAt: 'now',
      score: 0,
      user: loggedUser!,
    }
  }

  return {
    comments: commentData.comments,
    // TODO: Fix replies to replies rendering
    addComment: (commentText, parentCommentId) => {
      set((state) => {
        const createdComment = createComment(commentText)
        if (parentCommentId) {
          return {
            comments: state.comments.map((c) =>
              c.id === parentCommentId
                ? { ...c, replies: [...(c.replies || []), createdComment] }
                : c
            ),
          }
        }
        return { comments: [...state.comments, createdComment] }
      })
    },
    deleteComment: (commentId, parentCommentId = undefined) => {
      console.log(commentId + ' ' + parentCommentId)

      set((state) => {
        if (parentCommentId) {
          return {
            comments: state.comments.map((c) =>
              c.id !== parentCommentId
                ? c
                : {
                    ...c,
                    replies: c.replies?.filter((r) => r.id !== commentId),
                  }
            ),
          }
        }
        return {
          comments: state.comments.filter((c) => c.id !== commentId),
        }
      })
    },
    // TODO: Implement editComment
    editComment: (commentId, updatedCommentText) => {},
    // TODO: Implement upvoteComment
    upvoteComment: (commentId) => {},
    // TODO: Implement downVoteComment
    downvoteComment: (commentId) => {},
  }
})
