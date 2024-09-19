type UseApiProps = {
  body?: Record<string, any>
  contentType?: string
  endpoint: string
  requestType?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export default async function useApi({
  body,
  contentType = 'application/json',
  endpoint,
  requestType = 'GET',
}: UseApiProps) {
  let data: any
  let error: string | undefined
  try {
    const options: RequestInit = {
      method: requestType,
      headers: {
        'Content-Type': contentType,
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(endpoint, options)

    if (!response.ok) {
      return {
        data: undefined,
        error: `${response.status}: ${response.statusText}`,
      }
    }

    data = await response.json()
    return { data, error: undefined }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    return { data: undefined, error }
  }
}
