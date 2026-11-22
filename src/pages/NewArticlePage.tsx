import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { useAuth } from '../context/useAuth'
import { createArticle } from '../services/articleService'

function NewArticlePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleCreateArticle = async (data: {
    title: string
    description: string
    body: string
    tagList: string[]
  }) => {
    if (!user) return

    setError('')

    try {
      const response = await createArticle(data, user.token)

      if (response && 'article' in response) {
        navigate(`/articles/${response.article.slug}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article')
    }
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}

      <ArticleForm
        submitLabel="Publish Article"
        onSubmit={handleCreateArticle}
      />
    </>
  )
}

export default NewArticlePage
