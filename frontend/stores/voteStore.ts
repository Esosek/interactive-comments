import { create } from 'zustand'

const mockVotes = {
  '1': 12,
  '2': 5,
  '3': -4,
  '4': 2,
}

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
  setScore: (commentId: string, isUpvote: boolean) => void
}

export const useVoteStore = create<VoteStoreType>()((set, get) => {
  return {
    commentVotes: mockVotes,
    userVotes: {},
    computed: {
      commentScore(commentId) {
        return get().commentVotes[commentId] ?? 0
      },
      userCommentVote(commentId) {
        return get().userVotes[commentId]
      },
    },
    setScore(commentId, isUpvote) {
      set((state) => {
        if (state.userVotes[commentId] === isUpvote) {
          return { ...state }
        }
        let userVoted = Object.keys(state.userVotes).includes(commentId)
        if (userVoted) {
          delete state.userVotes[commentId]
        }
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
