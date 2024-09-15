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
    },
    setScore(commentId, isUpvote) {
      // TODO: Implement user score
      console.log('Voting ' + isUpvote + ' for commentId ' + commentId)
    },
  }
})
