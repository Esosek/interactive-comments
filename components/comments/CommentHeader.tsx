import { User } from '@/types/user'

import styles from './styles/CommentHeader.module.css'
import UserImage from '../common/UserImage'
import { useUserStore } from '@/stores/userStore'

type CommentHeaderProps = {
  user: User
  createdAt: string
}

export default function CommentHeader({
  user,
  createdAt: postedAt,
}: CommentHeaderProps) {
  const { loggedUser } = useUserStore()
  const isUserOwned = loggedUser?.username === user.username
  return (
    <div className={styles.header}>
      <UserImage username={user.username} imagePath={user.image.webp} />
      <p className={styles.username}>{user.username}</p>
      {isUserOwned && <p className={styles.userLabel}>you</p>}
      <p className={styles.postedText}>{postedAt}</p>
    </div>
  )
}
