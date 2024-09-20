import { UserComment } from '@/types/userComment'

export async function getComments() {
  return await sendRequest({
    query: `
      {
        comments {
          id
          content
          createdAt
          user {
            id
            username
            image
          }
          parentId
          replyingTo
        }
      }
    `,
  })
}

export async function getVotes(userId: string) {
  return await sendRequest({
    query: `
      {
        comments {
          id
          totalVotes
        }
        user(id: ${userId}) {
          votes {
            commentId
            voteType
          }
        }
      }
    `,
  })
}

export async function addComment(comment: UserComment) {
  return await sendRequest({
    query: `
    mutation {
      addComment(
        content: "${comment.content.replace(/"/g, '\\"')}"
        userId: "${comment.user.id}"
        ${comment.replyingTo ? `replyingTo: "${comment.replyingTo}"` : ''}
        ${comment.parentId ? `parentId: "${comment.parentId}"` : ''}
      ) {
    ok
    comment {
      id
      parentId
      content
      createdAt
      replyingTo
      user {
        id
        username
        image
      }
    }
  }
    }
    `,
  })
}

async function sendRequest(body: Record<string, string>) {
  let data: any
  let error: string | undefined

  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://127.0.0.1:5000/graphql',
      options
    )

    if (!response.ok) {
      return {
        data: undefined,
        error: `${response.status}: ${response.statusText}`,
      }
    }

    data = await response.json()
    return { data: data.data, error: undefined }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    return { data: undefined, error }
  }
}
