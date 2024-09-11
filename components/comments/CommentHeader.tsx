import { User } from '@/types/user'

import styles from './styles/CommentHeader.module.css'
import UserImage from '../common/UserImage'

type CommentHeaderProps = {
  user: User
  createdAt: string
}

export default function CommentHeader({
  user,
  createdAt: postedAt,
}: CommentHeaderProps) {
  return (
    <div className={styles.header}>
      <UserImage username={user.username} imagePath={user.image.webp} />
      <p className={styles.username}>{user.username}</p>
      <p className={styles.postedText}>{postedAt}</p>
    </div>
  )
}
