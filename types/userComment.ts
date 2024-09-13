import { type User } from './user'

export type UserComment = {
  id: string
  content: string
  createdAt: string
  score: number
  user: User
  parentId?: string
  replyingTo?: User
}
