import { FormEvent } from 'react'

import styles from './styles/CommentEdit.module.css'

import { UserComment } from '@/types/userComment'
import { useCommentStore } from '@/stores/commentStore'
import BaseTextArea from '../common/BaseTextArea'
import PrimaryButton from '../common/PrimaryButton'

type CommentEditProps = {
  comment: UserComment
  onUpdate?: () => void
}

export default function CommentEdit({
  comment,
  onUpdate = () => {},
}: CommentEditProps) {
  const editComment = useCommentStore((state) => state.editComment)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      'edit-text': { value: string }
    }
    const updatedText = target['edit-text'].value

    if (updatedText.trim().length === 0) {
      return
    }

    editComment(comment.id, updatedText)
    onUpdate()
  }
  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <BaseTextArea defaultValue={comment.content} name="edit-text" />
      <PrimaryButton type="submit">update</PrimaryButton>
    </form>
  )
}
