import CommentButtons from "./CommentButtons"
import CommentHeader from "./CommentHeader"
import CommentVotes from "./CommentVotes"
import styles from "./styles/Comment.module.css"
import { UserComment } from "@/types/userComment"

type CommentProps = {
  comment: UserComment
  isReply?: boolean
}

export default function Comment({ comment, isReply = false }: CommentProps) {
  return (
    <li className={styles.comment}>
      <CommentVotes score={comment.score} />
      <CommentHeader user={comment.user} createdAt={comment.createdAt} />
      <CommentButtons />
      <p>{comment.content}</p>
    </li>
  )
}
