import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { favoriteArticle, unfavoriteArticle } from '../services/articleService'
import type { ArticlePreview } from '../types/article'
import './ArticleCard.css'

interface ArticleCardProps {
  article: ArticlePreview
}

function ArticleCard({ article }: ArticleCardProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [favorited, setFavorited] = useState(article.favorited)
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFavorite() {
    if (!user) {
      navigate('/sign-in')
      return
    }

    if (isLoading) return

    try {
      setIsLoading(true)
      setError('')

      const response = favorited
        ? await unfavoriteArticle(article.slug, user.token)
        : await favoriteArticle(article.slug, user.token)

      setFavorited(response.article.favorited)
      setFavoritesCount(response.article.favoritesCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update like.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="article-card">
      <div className="article-card__content">
        <div className="article-card__author">
          {article.author.image && (
            <img
              className="article-card__avatar"
              src={article.author.image}
              alt={article.author.username}
            />
          )}

          <span>{article.author.username}</span>
        </div>

        <Link to={`/articles/${article.slug}`} className="article-card__title">
          {article.title}
        </Link>

        <p className="article-card__description">{article.description}</p>

        <div className="article-card__tags">
          {article.tagList.map((tag) => (
            <span key={tag} className="article-card__tag">
              {tag}
            </span>
          ))}
        </div>

        <span className="article-card__date">
          {new Date(article.createdAt).toLocaleDateString()}
        </span>

        {error && (
          <p className="article-card__error" role="alert">
            {error}
          </p>
        )}
      </div>

      <button
        className={`article-card__like ${favorited ? 'article-card__like--active' : ''}`}
        type="button"
        onClick={handleFavorite}
        disabled={isLoading}
        aria-label={favorited ? 'Remove like' : 'Like article'}
        aria-pressed={favorited}
      >
        {favorited ? '♥' : '♡'} {favoritesCount}
      </button>
    </article>
  )
}

export default ArticleCard
