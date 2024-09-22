import { create } from 'zustand'

import { getVotes, setVote } from '@/utils/apiQuery'
import { useUserStore } from './userStore'

type VoteStoreType = {
  commentVotes: {
    [commentId: string]: number
  }
  userVotes: {
    [commentId: string]: boolean
  }
  computed: {
    commentScore: (commentId: string) => number
    userCommentVote: (commentId: string) => boolean | undefined
  }
  getVotes: () => void
  addVote: (commentId: string, isUpvote: boolean) => void
}

export const useVoteStore = create<VoteStoreType>()((set, get) => {
  const loggedUser = useUserStore.getState().loggedUser
  return {
    commentVotes: {},
    userVotes: {},
    computed: {
      commentScore(commentId) {
        return get().commentVotes[commentId] ?? 0
      },
      userCommentVote(commentId) {
        return get().userVotes[commentId]
      },
    },
    async getVotes() {
      if (!loggedUser) {
        return
      }

      const { data } = await getVotes(loggedUser!.id)
      if (data) {
        const totalVotes = data.comments.reduce(
          (acc: Record<string, number>, cur: Record<string, number>) => {
            acc[cur.id] = cur.totalVotes
            return acc
          },
          {}
        )
        const votes = data.user.votes.reduce(
          (acc: Record<string, number>, cur: Record<string, number>) => {
            acc[cur.commentId] = cur.voteType
            return acc
          },
          {}
        )
        set((state) => ({
          ...state,
          commentVotes: totalVotes,
          userVotes: votes,
        }))
      }
    },
    async addVote(commentId, isUpvote) {
      // TODO: Prevent loggedUser voting for his comments
      if (!loggedUser) {
        return
      }

      // This vote already exists
      if (get().userVotes[commentId] === isUpvote) {
        return
      }
      const { data } = await setVote(commentId, loggedUser.id, isUpvote)
      if (data.setVote.ok) {
        set((state) => {
          // Vote was deleted if it's null
          if (!data.setVote.vote) {
            delete state.userVotes[commentId]
            return {
              ...state,
              commentVotes: {
                ...state.commentVotes,
                [commentId]: isUpvote
                  ? state.commentVotes[commentId] + 1
                  : state.commentVotes[commentId] - 1,
              },
              userVotes: {
                ...state.userVotes,
              },
            }
          }
          const updatedVote = data.setVote.vote
          return {
            ...state,
            commentVotes: {
              ...state.commentVotes,
              [updatedVote.commentId]: updatedVote.voteType
                ? state.commentVotes[updatedVote.commentId] + 1
                : state.commentVotes[updatedVote.commentId] - 1,
            },
            userVotes: {
              ...state.userVotes,
              [updatedVote.commentId]: updatedVote.voteType,
            },
          }
        })
      }
    },
  }
})
