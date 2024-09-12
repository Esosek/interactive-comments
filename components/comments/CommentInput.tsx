import { FormEvent, useRef, useState } from 'react'

import styles from './styles/CommentInput.module.css'
import { useUserStore } from '@/stores/userStore'
import Card from '../common/Card'
import UserImage from '../common/UserImage'
import BaseTextArea from '../common/BaseTextArea'
import PrimaryButton from '../common/PrimaryButton'

type CommentInputProps = {
  replyingTo?: string
}

export default function CommentInput({ replyingTo }: CommentInputProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { loggedUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  const buttonLabel = replyingTo ? 'reply' : 'send'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      'new-comment-text': { value: string }
    }
    const commentText = target['new-comment-text'].value

    if (commentText.trim().length === 0) {
      return
    }
    setIsLoading(true)

    // TODO: Add new UserComment to commentStore
    console.log('Updating commentStore')
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
          defaultValue={replyingTo ? `@${replyingTo} ` : undefined}
          autoFocus={replyingTo !== undefined}
        />
        <PrimaryButton disabled={isLoading} type="submit">
          {isLoading ? `${buttonLabel}ing...` : buttonLabel}
        </PrimaryButton>
      </form>
    </Card>
  )
}
