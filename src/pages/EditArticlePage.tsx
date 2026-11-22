import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { useAuth } from '../context/useAuth'
import { getArticle, updateArticle } from '../services/articleService'
import type { ArticleFormData } from '../types/article'

function EditArticlePage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState<ArticleFormData | null>(
    null,
  )
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const controller = new AbortController()

    async function loadArticle() {
      try {
        const response = await getArticle(slug!, controller.signal)

        const article = response.article

        setInitialValues({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        })
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load article',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadArticle()

    return () => controller.abort()
  }, [slug])

  const handleUpdateArticle = async (data: ArticleFormData) => {
    if (!user || !slug) return

    setError('')

    try {
      const response = await updateArticle(slug, data, user.token)

      if (response && 'article' in response) {
        navigate(`/articles/${response.article.slug}`)
      } else {
        navigate(`/articles/${slug}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article')
    }
  }

  if (isLoading) return <p>Loading article...</p>

  if (error && !initialValues) {
    return <p role="alert">{error}</p>
  }

  if (!initialValues) return null

  return (
    <>
      {error && <p role="alert">{error}</p>}

      <ArticleForm
        initialValues={initialValues}
        submitLabel="Update Article"
        onSubmit={handleUpdateArticle}
      />
    </>
  )
}

export default EditArticlePage
