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
  }
  addComment: (commentText: string, parentCommentId?: string) => void
  deleteComment: (commentId: string) => void
  editComment: (commentId: string, updatedText: string) => void
}

export const useCommentStore = create<CommentStoreType>()((set, get) => {
  const loggedUser = useUserStore.getState().loggedUser

  function createComment(
    commentText: string,
    commentParentId?: string,
    replyingTo?: string
  ): UserComment {
    const now = Date.now()
    console.log(now)

    return {
      id: nanoid(),
      parentId: commentParentId,
      content: commentText,
      createdAt: now,
      user: loggedUser!,
      replyingTo: replyingTo,
    }
  }

  function splitReplyText(commentText: string) {
    const regex = /@(\w+)(?:\s+(.*))?/
    const match = commentText.match(regex)

    if (match) {
      const replyToUsername = match[1]
      const content = match[2]?.trim()

      return [replyToUsername, content]
    }
    return [undefined, commentText]
  }

  return {
    comments: commentData.comments,
    computed: {
      parentComments: () => get().comments.filter((c) => !c.parentId),
      replies: (parentId) =>
        get().comments.filter((c) => c.parentId === parentId),
    },
    addComment: (commentText, parentCommentId) => {
      const [replyToUsername, content] = splitReplyText(commentText)

      if (!content) {
        return
      }
      set((state) => {
        const createdComment = createComment(
          content!,
          parentCommentId,
          replyToUsername
        )
        return { comments: [...state.comments, createdComment] }
      })
    },
    deleteComment: (commentId) => {
      set((state) => ({
        comments: state.comments.filter((c) => c.id !== commentId),
      }))
    },
    editComment: (commentId, updatedCommentText) => {
      const [replyToUsername, content] = splitReplyText(updatedCommentText)
      if (!content) {
        return
      }
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId
            ? { ...c, content: content!, replyingTo: replyToUsername }
            : c
        ),
      }))
    },
  }
})
