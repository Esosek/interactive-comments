import Image from 'next/image'

import styles from './styles/CommentButtons.module.css'
import iconReply from '@/public/images/icon-reply.svg'

type CommentButtonsProps = {}

export default function CommentButtons(props: CommentButtonsProps) {
  return (
    <button className={styles.replyBtn}>
      <div className={styles.iconWrapper}>
        <Image src={iconReply.src} alt="reply icon" fill />
      </div>
      Reply
    </button>
  )
}
