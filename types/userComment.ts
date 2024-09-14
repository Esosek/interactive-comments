import { type User } from './user'

export type UserComment = {
  id: string
  content: string
  createdAt: number
  score: number // TODO: Extract score to it's own voteStore
  user: User
  parentId?: string
  replyingTo?: string
}
