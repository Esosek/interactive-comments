import styles from './styles/Comment.module.css'
import { UserComment } from '@/types/userComment'

import { useUserStore } from '@/stores/userStore'

import Card from '../common/Card'
import CommentButtons from './CommentButtons'
import CommentHeader from './CommentHeader'
import CommentVotes from './CommentVotes'
import CommentReplies from './CommentReplies'
import CommentInput from './CommentInput'
import { useState } from 'react'

type CommentProps = {
  comment: UserComment
  isReply?: boolean
}

export default function Comment({ comment, isReply = false }: CommentProps) {
  const loggedUser = useUserStore((state) => state.loggedUser)
  const isUserOwned = loggedUser?.username === comment.user.username
  const [isReplying, setIsReplying] = useState(false)

  const handleReply = () => setIsReplying(true)

  function handleDelete() {
    // TODO: Implement Comment delete
    console.log('Deleting comment ' + comment.id)
  }

  function handleEdit() {
    // TODO: Implement Comment edit
    console.log('Editing comment ' + comment.id)
  }

  return (
    <li>
      <Card>
        <div className={styles.comment}>
          <CommentVotes score={comment.score} />
          <CommentHeader user={comment.user} createdAt={comment.createdAt} />
          <CommentButtons
            isUserOwned={isUserOwned}
            onReply={handleReply}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
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
      {isReplying && (
        <CommentInput
          replyToComment={comment}
          onCommentAdded={() => setIsReplying(false)}
        />
      )}
      {!isReply && comment.replies && (
        <CommentReplies replies={comment.replies} />
      )}
    </li>
  )
}
