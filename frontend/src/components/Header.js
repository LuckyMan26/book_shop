import React, { useState } from 'react';
import './Header.css';
import AddBookModal from './AddBookModal';  // Import the modal component

function Header({ addBook, setNewBook, cats }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle when the "Add Book" button is clicked
  const handleAddBookClick = () => {
    setIsModalOpen(true); // Open the modal
    
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle the submission of the book data from the modal
  const handleSubmitBook = (book) => {
    setNewBook(book); // Set the new book data in the parent state
    
    console.log(book);
    addBook(book); // Trigger the function to add the book to your list
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <header className="header">
      <h1>📚 Welcome to My Bookstore</h1>
      <p>Contact us: bookstore@example.com | Phone: +123 456 7890</p>
      
      <button
        onClick={handleAddBookClick} // Open modal on click
        className="add-book-btn"
      >
        ➕ Add Book
      </button>

      {/* Modal component that handles adding book info */}
      <AddBookModal
        isOpen={isModalOpen} // Pass the modal open state
        onClose={handleCloseModal} // Pass the function to close the modal
        onSubmit={handleSubmitBook} // Pass the function to handle the form submission
        cats_={cats}
      />
    </header>
  );
}

export default Header;
