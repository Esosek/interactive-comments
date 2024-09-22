import { create } from 'zustand'
import { nanoid } from 'nanoid'

import mockData from '@/data.json'
import { type UserComment } from '@/types/userComment'
import { useUserStore } from './userStore'
import {
  addComment,
  getComments,
  removeComment,
  updateComment,
} from '@/utils/apiQuery'

type CommentStoreType = {
  comments: UserComment[]
  isLoading: boolean
  error: string | undefined
  computed: {
    parentComments: () => UserComment[]
    replies: (parentId: string) => UserComment[]
  }
  getComments: () => void
  addComment: (commentText: string, parentCommentId?: string) => void
  deleteComment: (commentId: string) => void
  editComment: (commentId: string, updatedText: string) => void
}

export const useCommentStore = create<CommentStoreType>()((set, get) => {
  const loggedUser = useUserStore.getState().loggedUser

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
    comments: [],
    isLoading: true,
    error: undefined,
    computed: {
      parentComments: () => get().comments.filter((c) => !c.parentId),
      replies: (parentId) =>
        get().comments.filter((c) => c.parentId === parentId),
    },
    getComments: async () => {
      const { data, error } = await getComments()
      set((state) => ({
        ...state,
        isLoading: false,
        // error: error,
        comments: data?.comments ?? mockData.comments, // Use mockData without backend
      }))
    },
    addComment: async (commentText, parentCommentId) => {
      const [replyToUsername, content] = splitReplyText(commentText)

      if (!content) {
        return
      }

      const { data, error } = await addComment({
        id: '',
        parentId: parentCommentId,
        content: content,
        createdAt: new Date(),
        user: loggedUser!,
        replyingTo: replyToUsername,
      })

      if (error || !data.addComment.ok) {
        // TODO: Implement error feedback to user for all actions
        // Add Comment locally to work without backend
        const newComment = {
          id: nanoid(),
          parentId: parentCommentId,
          content: content,
          createdAt: new Date(),
          user: loggedUser!,
          replyingTo: replyToUsername,
        }
        set((state) => {
          return { comments: [...state.comments, newComment] }
        })
        return
      }

      set((state) => {
        return { comments: [...state.comments, data.addComment.comment] }
      })
    },
    deleteComment: async (commentId) => {
      if (loggedUser) {
        const { data, error } = await removeComment(commentId, loggedUser.id)
        if (error || !data.removeComment.ok) {
          // TODO: Handle error case
          // return
        }
        // Always update the state so it works locally without backend
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== commentId),
        }))
      }
    },
    editComment: async (commentId, updatedCommentText) => {
      const [replyToUsername, content] = splitReplyText(updatedCommentText)
      if (!content) {
        return
      }
      if (loggedUser) {
        const { data, error } = await updateComment(
          commentId,
          loggedUser.id,
          content
        )
        if (error || !data.updateComment.ok) {
          // TODO: Implement error handling
          // Continue executing so it works locally without backend
          // return
        }
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === commentId
              ? { ...c, content: content, replyingTo: replyToUsername }
              : c
          ),
        }))
      }
    },
  }
})
