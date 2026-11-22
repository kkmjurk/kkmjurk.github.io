import './DeleteArticleModal.css'

interface DeleteArticleModalProps {
  isOpen: boolean
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

function DeleteArticleModal({
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteArticleModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <h2 id="delete-modal-title">Delete article?</h2>

        <p>Are you sure you want to delete this article?</p>

        <div className="delete-modal__actions">
          <button type="button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>

          <button type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteArticleModal
