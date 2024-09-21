import { create } from 'zustand'

import { getVotes } from '@/utils/apiQuery'
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
    addVote(commentId, isUpvote) {
      // TODO: Prevent loggedUser voting for his comments
      set((state) => {
        if (state.userVotes[commentId] === isUpvote) {
          return { ...state }
        }
        let userVoted = Object.keys(state.userVotes).includes(commentId)
        if (userVoted) {
          // TODO: Delete vote on BE
          delete state.userVotes[commentId]
        }
        // TODO: Add vote on BE
        return {
          ...state,
          commentVotes: {
            ...state.commentVotes,
            [commentId]: isUpvote
              ? state.commentVotes[commentId] + 1
              : state.commentVotes[commentId] - 1,
          },
          userVotes: userVoted
            ? { ...state.userVotes }
            : { ...state.userVotes, [commentId]: isUpvote },
        }
      })
    },
  }
})
