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
import { useCommentStore } from '@/stores/commentStore'
import CommentEdit from './CommentEdit'

type CommentProps = {
  comment: UserComment
  parentCommentId?: string
  isReply?: boolean
}

export default function Comment({ comment, isReply = false }: CommentProps) {
  const loggedUser = useUserStore((state) => state.loggedUser)
  const replies = useCommentStore((state) => state.computed.replies(comment.id))
  const deleteComment = useCommentStore((state) => state.deleteComment)

  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const isUserOwned = loggedUser?.username === comment.user.username

  const handleReply = () => setIsReplying(true)
  const handleDelete = () => deleteComment(comment.id)
  const handleEdit = () => setIsEditing(true)

  return (
    <li>
      <Card>
        <div className={styles.comment}>
          <CommentVotes commentId={comment.id} />
          <CommentHeader user={comment.user} postedAt={comment.createdAt} />
          <CommentButtons
            isUserOwned={isUserOwned}
            onReply={handleReply}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          {isEditing ? (
            <CommentEdit comment={comment} onSave={() => setIsEditing(false)} />
          ) : (
            <p className={styles.content}>
              {comment.replyingTo && (
                <span className={styles.replyToUsername}>
                  @{comment.replyingTo}{' '}
                </span>
              )}
              {comment.content}
            </p>
          )}
        </div>
      </Card>
      {isReplying && (
        <CommentInput
          replyToComment={comment}
          onCommentAdded={() => setIsReplying(false)}
        />
      )}
      {!isReply && replies && (
        <CommentReplies replies={replies} parentCommentId={comment.id} />
      )}
    </li>
  )
}
