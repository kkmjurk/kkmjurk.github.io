import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '../context/useAuth'
import {
  deleteArticle,
  favoriteArticle,
  getArticle,
  unfavoriteArticle,
} from '../services/articleService'
import DeleteArticleModal from '../components/DeleteArticleModal'
import type { Article } from '../types/article'
import './ArticlePage.css'

function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFavoriting, setIsFavoriting] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!slug) return

    const controller = new AbortController()
    const articleSlug = slug

    async function loadArticle() {
      try {
        setLoading(true)
        setError('')

        const data = await getArticle(articleSlug, controller.signal)
        setArticle(data.article)
      } catch (err) {
        if (controller.signal.aborted) return

        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadArticle()

    return () => controller.abort()
  }, [slug])

  const isAuthor = user !== null && article?.author.username === user.username

  async function handleFavorite() {
    if (!user) {
      navigate('/sign-in')
      return
    }

    if (!slug || !article || isFavoriting) return

    try {
      setIsFavoriting(true)
      setError('')

      const response = article.favorited
        ? await unfavoriteArticle(slug, user.token)
        : await favoriteArticle(slug, user.token)

      setArticle(response.article)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update like.')
    } finally {
      setIsFavoriting(false)
    }
  }

  async function handleDeleteArticle() {
    if (!slug || !user) return

    try {
      setIsDeleting(true)
      setError('')

      await deleteArticle(slug, user.token)

      navigate('/articles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article.')
      setIsDeleting(false)
      setIsDeleteModalOpen(false)
    }
  }

  if (!slug) {
    return (
      <main className="article-page">
        <p>Article not found.</p>
        <Link to="/articles">Back to articles</Link>
      </main>
    )
  }

  if (loading) {
    return <p className="article-page__status">Loading article...</p>
  }

  if (error && !article) {
    return (
      <main className="article-page">
        <p className="article-page__error">{error}</p>
        <Link to="/articles">Back to articles</Link>
      </main>
    )
  }

  if (!article) return null

  return (
    <main className="article-page">
      <Link to="/articles" className="article-page__back">
        ← Back to articles
      </Link>

      <header className="article-page__header">
        <h1>{article.title}</h1>

        <div className="article-page__author">
          {article.author.image && (
            <img src={article.author.image} alt={article.author.username} />
          )}

          <div>
            <p>{article.author.username}</p>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {isAuthor && (
          <div className="article-page__actions">
            <Link
              to={`/articles/${article.slug}/edit`}
              className="article-page__edit"
            >
              Edit
            </Link>

            <button
              type="button"
              className="article-page__delete"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </button>
          </div>
        )}
      </header>

      {error && (
        <p className="article-page__error" role="alert">
          {error}
        </p>
      )}

      <div className="article-page__body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>

      <div className="article-page__footer">
        <button
          type="button"
          onClick={handleFavorite}
          disabled={isFavoriting}
          aria-pressed={article.favorited}
          className="article-page__favorite"
        >
          {article.favorited ? '♥' : '♡'} {article.favoritesCount}
          {isFavoriting ? ' Updating...' : ''}
        </button>

        <Link to="/articles">Back to articles</Link>
      </div>

      <DeleteArticleModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onConfirm={handleDeleteArticle}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </main>
  )
}

export default ArticlePage
