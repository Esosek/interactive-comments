import { create } from 'zustand'

const mockScores = {
  '1': 12,
  '2': 5,
  '3': -4,
  '4': 2,
}

type VoteStoreType = {
  commentScores: {
    [commentId: string]: number
  }
  userVotes: {
    [commentId: string]: boolean
  }
  vote: (commentId: string, isUpvote: boolean) => void
}

export const useVoteStore = create<VoteStoreType>()((set) => {
  return {
    commentScores: mockScores,
    userVotes: {},
    vote(commentId, isUpvote) {
      // TODO: Implement user vote
      console.log('Voting ' + isUpvote + ' for commentId ' + commentId)
    },
  }
})
