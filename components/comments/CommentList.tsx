import { useCommentStore } from "@/stores/commentStore";
import Comment from "./Comment";

export default function CommentList() {
  const comments = useCommentStore((state) => state.comments);
  return (
    <ul>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
