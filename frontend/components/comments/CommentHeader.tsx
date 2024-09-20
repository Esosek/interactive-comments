import { User } from '@/types/user'

import styles from './styles/CommentHeader.module.css'
import UserImage from '../common/UserImage'
import { useUserStore } from '@/stores/userStore'

type CommentHeaderProps = {
  user: User
  postedAt: Date
}

export default function CommentHeader({ user, postedAt }: CommentHeaderProps) {
  const loggedUser = useUserStore((state) => state.loggedUser)
  const isUserOwned = loggedUser?.id === user.id

  const postedTimeStamp = new Date(postedAt).getTime() / 1000

  function getTimeAgo() {
    const now = Date.now()
    const secondsAgo = Math.floor(now / 1000 - postedTimeStamp)

    const units = [
      { name: 'year', seconds: 60 * 60 * 24 * 365 },
      { name: 'month', seconds: 60 * 60 * 24 * 30 },
      { name: 'week', seconds: 60 * 60 * 24 * 7 },
      { name: 'day', seconds: 60 * 60 * 24 },
      { name: 'hour', seconds: 60 * 60 },
      { name: 'minute', seconds: 60 },
    ]

    for (const unit of units) {
      const count = Math.floor(secondsAgo / unit.seconds)
      if (count >= 1) {
        return `${count} ${unit.name}${count > 1 ? 's' : ''} ago`
      }
    }
    return 'just now'
  }
  return (
    <div className={styles.header}>
      <UserImage user={user} />
      <p className={styles.username}>{user.username}</p>
      {isUserOwned && <p className={styles.userLabel}>you</p>}
      <p className={styles.postedText}>{getTimeAgo()}</p>
    </div>
  )
}
