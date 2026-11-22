export interface Author {
  username: string
  bio: string | null
  image: string | null
  following: boolean
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export type ArticlePreview = Omit<Article, 'body'>

export interface ArticlesResponse {
  articles: ArticlePreview[]
  articlesCount: number
}

export interface ArticleResponse {
  article: Article
}

export interface ArticleFormData {
  title: string
  description: string
  body: string
  tagList: string[]
}
