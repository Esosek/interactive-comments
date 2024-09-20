export async function getComments() {
  return await sendRequest(
    `
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
    `
  )
}

export async function getVotes(userId: string) {
  return await sendRequest(
    `
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
    `
  )
}

async function sendRequest(query: string) {
  let data: any
  let error: string | undefined
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
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
