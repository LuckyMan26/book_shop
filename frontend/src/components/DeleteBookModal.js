import React, { useState, useEffect } from 'react';
import './DeleteBookModal.css'; // Make sure the styles are linked correctly

const DeleteBookModal = ({ isOpen, onClose, book, onSubmit}) => {
  console.log(book);
  const [id, setId] = useState(book.id);
  // Sync state with incoming prop when modal is opened


  const handleSubmit = () => {
    book = {'id': book.id}
    console.log(book.id);
    onSubmit(book);
    onClose(); // Close the modal after submission
  };



  console.log('isOpen ' + isOpen);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Confirm book deletion</h2>

        
  
        <div className="button-container">
          <button className="submit-btn" onClick={handleSubmit}>Delete</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )};

export default DeleteBookModal;