import { useUserStore } from '@/stores/userStore'
import CommentButtons from './CommentButtons'
import CommentHeader from './CommentHeader'
import CommentVotes from './CommentVotes'
import styles from './styles/Comment.module.css'
import { UserComment } from '@/types/userComment'

type CommentProps = {
  comment: UserComment
  isReply?: boolean
}

export default function Comment({ comment, isReply = false }: CommentProps) {
  const { loggedUser } = useUserStore()
  const isUserOwned = loggedUser?.username === comment.user.username
  return (
    <li className={styles.commentItem}>
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
      {!isReply && comment.replies && (
        <ul className={styles.replies}>
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} isReply />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
