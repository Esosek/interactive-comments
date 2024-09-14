import { FormEvent } from 'react'

import styles from './styles/CommentEdit.module.css'

import { UserComment } from '@/types/userComment'
import { useCommentStore } from '@/stores/commentStore'
import BaseTextArea from '../common/BaseTextArea'
import PrimaryButton from '../common/PrimaryButton'

type CommentEditProps = {
  comment: UserComment
  onSave?: () => void
}

export default function CommentEdit({
  comment,
  onSave = () => {},
}: CommentEditProps) {
  const editComment = useCommentStore((state) => state.editComment)
  const defaultValue = comment.replyingTo
    ? `@${comment.replyingTo} ${comment.content}`
    : comment.content

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      'edit-text': { value: string }
    }
    const updatedText = target['edit-text'].value

    editComment(comment.id, updatedText)
    onSave()
  }
  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <BaseTextArea defaultValue={defaultValue} name='edit-text' />
      <PrimaryButton type='submit'>update</PrimaryButton>
    </form>
  )
}
