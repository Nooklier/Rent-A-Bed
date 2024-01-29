import './DeleteReviewModal.css'

function DeleteReviewModal({ isOpen, onClose, onDelete, reviewId }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this review?</p>
          <button onClick={() => onDelete(reviewId)}>Yes (Delete Review)</button>
          <button onClick={onClose}>No (Keep Review)</button>
        </div>
      </div>
    );
  }

  export default DeleteReviewModal;