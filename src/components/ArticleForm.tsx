import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { ArticleFormData } from '../types/article'
import './ArticleForm.css'

interface ArticleFormProps {
  initialValues?: ArticleFormData
  submitLabel: string
  onSubmit: (data: ArticleFormData) => Promise<void>
}

interface FormValues {
  title: string
  description: string
  body: string
  tags: string
}

function ArticleForm({
  initialValues,
  submitLabel,
  onSubmit,
}: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        description: initialValues.description,
        body: initialValues.body,
        tags: initialValues.tagList.join(', '),
      })
    }
  }, [initialValues, reset])

  const submitForm = async (values: FormValues) => {
    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      body: values.body.trim(),
      tagList: values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
  }

  return (
    <main className="article-form-page">
      <form className="article-form" onSubmit={handleSubmit(submitForm)}>
        <h1>{initialValues ? 'Edit article' : 'Create new article'}</h1>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          placeholder="Article title"
          {...register('title', {
            required: 'Title is required',
            validate: (value) => value.trim().length > 0 || 'Title is required',
          })}
        />
        {errors.title && (
          <p className="article-form__error">{errors.title.message}</p>
        )}

        <label htmlFor="description">Description</label>
        <input
          id="description"
          placeholder="What is this article about?"
          {...register('description', {
            required: 'Description is required',
            validate: (value) =>
              value.trim().length > 0 || 'Description is required',
          })}
        />
        {errors.description && (
          <p className="article-form__error">{errors.description.message}</p>
        )}

        <label htmlFor="body">Article body</label>
        <textarea
          id="body"
          rows={10}
          placeholder="Write your article..."
          {...register('body', {
            required: 'Article body is required',
            validate: (value) =>
              value.trim().length > 0 || 'Article body is required',
          })}
        />
        {errors.body && (
          <p className="article-form__error">{errors.body.message}</p>
        )}

        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          placeholder="React, TypeScript, JavaScript"
          {...register('tags')}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </form>
    </main>
  )
}

export default ArticleForm
