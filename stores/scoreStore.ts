import { create } from 'zustand'

const mockScores = {
  '1': 12,
  '2': 5,
  '3': -4,
  '4': 2,
}

type ScoreStoreType = {
  commentScores: {
    [commentId: string]: number
  }
  userScores: {
    [commentId: string]: boolean
  }
  setScore: (commentId: string, isPositive: boolean) => void
}

export const useScoreStore = create<ScoreStoreType>()((set) => {
  return {
    commentScores: mockScores,
    userScores: {},
    setScore(commentId, isPositive) {
      // TODO: Implement user score
      console.log('Voting ' + isPositive + ' for commentId ' + commentId)
    },
  }
})
