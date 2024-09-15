import { type User } from './user'

export type UserComment = {
  id: string
  content: string
  createdAt: number
  user: User
  parentId?: string
  replyingTo?: string
}
