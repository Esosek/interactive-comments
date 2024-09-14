import { FormEvent, useRef, useState } from 'react'

import styles from './styles/CommentInput.module.css'
import { useUserStore } from '@/stores/userStore'
import Card from '../common/Card'
import UserImage from '../common/UserImage'
import BaseTextArea from '../common/BaseTextArea'
import PrimaryButton from '../common/PrimaryButton'
import { useCommentStore } from '@/stores/commentStore'
import { UserComment } from '@/types/userComment'

type CommentInputProps = {
  replyToComment?: UserComment
  onCommentAdded?: () => void
}

export default function CommentInput({
  replyToComment,
  onCommentAdded = () => {},
}: CommentInputProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const loggedUser = useUserStore((state) => state.loggedUser)
  const addComment = useCommentStore((state) => state.addComment)

  const [isLoading, setIsLoading] = useState(false)

  const buttonLabel = replyToComment ? 'reply' : 'send'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!loggedUser) {
      return
    }

    const target = e.target as typeof e.target & {
      'new-comment-text': { value: string }
    }
    const commentText = target['new-comment-text'].value

    setIsLoading(true)

    addComment(commentText, replyToComment?.parentId ?? replyToComment?.id)
    onCommentAdded()
    formRef.current!.reset()

    setIsLoading(false)
  }

  return (
    <Card>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.commentInput}
      >
        <div className={styles.userImage}>
          {loggedUser && <UserImage user={loggedUser} />}
        </div>
        <BaseTextArea
          name="new-comment-text"
          defaultValue={
            replyToComment ? `@${replyToComment.user.username} ` : undefined
          }
          autoFocus={replyToComment !== undefined}
        />
        <PrimaryButton disabled={isLoading} type="submit">
          {isLoading ? `${buttonLabel}ing...` : buttonLabel}
        </PrimaryButton>
      </form>
    </Card>
  )
}
