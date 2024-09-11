import styles from './styles/CommentReplies.module.css'
import { UserComment } from '@/types/userComment'
import Comment from './Comment'

type CommentRepliesProps = {
  replies: UserComment[]
}

export default function CommentReplies({ replies }: CommentRepliesProps) {
  return (
    <ul className={styles.replies}>
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} isReply />
      ))}
    </ul>
  )
}
