'use client'

import Comment from '@/components/comments/Comment'
import CommentInput from '@/components/comments/CommentInput'
import { useCommentStore } from '@/stores/commentStore'
import { useEffect } from 'react'

export default function Home() {
  const areCommentsLoading = useCommentStore((state) => state.isLoading)
  const error = useCommentStore((state) => state.error)
  const getComments = useCommentStore((state) => state.getComments)
  const comments = useCommentStore((state) => state.computed.parentComments())

  useEffect(() => {
    getComments()
  }, [getComments])

  let content = (
    <>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      <CommentInput />
    </>
  )
  if (areCommentsLoading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = (
      <>
        <p>Fetching comment data failed. Please refresh the page.</p>
        <p>{error}</p>
      </>
    )
  }
  return <main>{content}</main>
}
