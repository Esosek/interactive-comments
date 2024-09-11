import styles from './styles/Comment.module.css'
import { UserComment } from '@/types/userComment'

import { useUserStore } from '@/stores/userStore'

import Card from '../common/Card'
import CommentButtons from './CommentButtons'
import CommentHeader from './CommentHeader'
import CommentVotes from './CommentVotes'
import CommentReplies from './CommentReplies'

type CommentProps = {
  comment: UserComment
  isReply?: boolean
}

export default function Comment({ comment, isReply = false }: CommentProps) {
  const { loggedUser } = useUserStore()
  const isUserOwned = loggedUser?.username === comment.user.username
  return (
    <li>
      <Card>
        <div className={styles.comment}>
          <CommentVotes score={comment.score} />
          <CommentHeader user={comment.user} createdAt={comment.createdAt} />
          <CommentButtons isUserOwned={isUserOwned} />
          <p className={styles.content}>
            {comment.replyingTo && (
              <span className={styles.replyToUsername}>
                @{comment.replyingTo}{' '}
              </span>
            )}
            {comment.content}
          </p>
        </div>
      </Card>
      {!isReply && comment.replies && (
        <CommentReplies replies={comment.replies} />
      )}
    </li>
  )
}
