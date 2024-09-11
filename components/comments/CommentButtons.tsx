import Image from 'next/image'

import styles from './styles/CommentButtons.module.css'

import iconReply from '@/public/images/icon-reply.svg'
import iconDelete from '@/public/images/icon-delete.svg'
import iconEdit from '@/public/images/icon-edit.svg'

type CommentButtonsProps = {
  onReply?: () => void
  onDelete?: () => void
  onEdit?: () => void
  isUserOwned?: boolean
}

export default function CommentButtons({
  onReply,
  onDelete,
  onEdit,
  isUserOwned = false,
}: CommentButtonsProps) {
  return (
    <div className={styles.commentButtons}>
      {isUserOwned ? (
        <>
          <button
            onClick={onDelete}
            className={styles.btn}
            style={{ color: 'var(--clr-red-500)' }}
          >
            <div className={styles.iconWrapper}>
              <Image src={iconDelete.src} alt="delete icon" fill />
            </div>
            Delete
          </button>
          <button
            onClick={onEdit}
            className={styles.btn}
            style={{ color: 'var(--clr-blue-500)' }}
          >
            <div className={styles.iconWrapper}>
              <Image src={iconEdit.src} alt="edit icon" fill />
            </div>
            Edit
          </button>
        </>
      ) : (
        <button
          onClick={onReply}
          className={styles.btn}
          style={{ color: 'var(--clr-blue-500)' }}
        >
          <div className={styles.iconWrapper}>
            <Image src={iconReply.src} alt="reply icon" fill />
          </div>
          Reply
        </button>
      )}
    </div>
  )
}
