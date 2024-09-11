import { type User } from './user'

export type UserComment = {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replyingTo?: string
  replies?: UserComment[]
}
