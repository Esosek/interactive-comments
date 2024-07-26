import { UserComment } from "@/types/userComment";

type CommentProps = {
  comment: UserComment;
  isReply?: boolean;
};

export default function Comment({ comment, isReply = false }: CommentProps) {
  return <li>{comment.content}</li>;
}
