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
  computed: {
    commentScore: (commentId: string) => number
  }
  setScore: (commentId: string, isPositive: boolean) => void
}

export const useScoreStore = create<ScoreStoreType>()((set, get) => {
  return {
    commentScores: mockScores,
    userScores: {},
    computed: {
      commentScore(commentId) {
        return get().commentScores[commentId] ?? 0
      },
    },
    setScore(commentId, isPositive) {
      // TODO: Implement user score
      console.log('Voting ' + isPositive + ' for commentId ' + commentId)
    },
  }
})
