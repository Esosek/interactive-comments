'use client'

import Comment from '@/components/comments/Comment'
import CommentInput from '@/components/comments/CommentInput'
import { useCommentStore } from '@/stores/commentStore'

export default function Home() {
  const comments = useCommentStore((state) => state.computed.parentComments())
  return (
    <main>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      <CommentInput />
    </main>
  )
}
