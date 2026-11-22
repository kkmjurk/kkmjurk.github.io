import type {
  ArticleFormData,
  ArticleResponse,
  ArticlesResponse,
} from '../types/article'

const API_URL = 'https://realworld.habsida.net/api'

export class ArticleApiError extends Error {
  errors: Record<string, string[]>

  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message)
    this.name = 'ArticleApiError'
    this.errors = errors
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text()

  let data: Record<string, unknown> = {}

  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    const errors = data.errors as Record<string, string[]> | undefined

    throw new ArticleApiError(
      errors
        ? Object.values(errors).flat().join(' ')
        : String(data.message ?? `Request failed: ${response.status}`),
      errors ?? {},
    )
  }

  return data as T
}

async function articleRequest(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE',
  token: string,
  article?: ArticleFormData,
): Promise<ArticleResponse | void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    ...(article ? { body: JSON.stringify({ article }) } : {}),
  })

  if (method === 'DELETE' && response.ok) {
    return
  }

  return handleResponse<ArticleResponse>(response)
}

export async function getArticles(
  limit: number,
  offset: number,
  signal?: AbortSignal,
): Promise<ArticlesResponse> {
  const response = await fetch(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`,
    { signal },
  )

  return handleResponse<ArticlesResponse>(response)
}

export async function getArticle(
  slug: string,
  signal?: AbortSignal,
): Promise<ArticleResponse> {
  const response = await fetch(
    `${API_URL}/articles/${encodeURIComponent(slug)}`,
    { signal },
  )

  return handleResponse<ArticleResponse>(response)
}

export function createArticle(data: ArticleFormData, token: string) {
  return articleRequest('/articles', 'POST', token, data)
}

export function updateArticle(
  slug: string,
  data: ArticleFormData,
  token: string,
) {
  return articleRequest(
    `/articles/${encodeURIComponent(slug)}`,
    'PUT',
    token,
    data,
  )
}

export function deleteArticle(slug: string, token: string) {
  return articleRequest(
    `/articles/${encodeURIComponent(slug)}`,
    'DELETE',
    token,
  )
}

export async function favoriteArticle(
  slug: string,
  token: string,
): Promise<ArticleResponse> {
  const response = await fetch(
    `${API_URL}/articles/${encodeURIComponent(slug)}/favorite`,
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  )

  return handleResponse<ArticleResponse>(response)
}

export async function unfavoriteArticle(
  slug: string,
  token: string,
): Promise<ArticleResponse> {
  const response = await fetch(
    `${API_URL}/articles/${encodeURIComponent(slug)}/favorite`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  )

  return handleResponse<ArticleResponse>(response)
}
