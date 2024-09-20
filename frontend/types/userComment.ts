import { type User } from './user'

export type UserComment = {
  id: string
  content: string
  createdAt: Date
  user: User
  parentId?: string
  replyingTo?: string
}
