import React, { useState } from 'react';
import './BookCard.css';
import EditBookModal from './EditBookModal';
import DeleteBookModal from './DeleteBookModal';
function BookCard({ book, editBook, deleteBook,cats }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const EditButtonClicked = () => {
    console.log('clicked');
    setIsEditing(true);
  }
  const DeleteButtonClicked = () => {
    console.log('delete');
    setIsDeleting(true);
  }
  const handleEditSubmit = (updatedBook) => {
    console.log(updatedBook)
    editBook(updatedBook); // Submit updated book details
    setIsEditing(false); // Close the modal
  };

  const deleteSubmit = (id) => {
    console.log(id)
    deleteBook(id.id); // Submit updated book details
    setIsDeleting(false); // Close the modal
  };
  var category_;
  for(var i = 0; i <cats.length;i++){
      if (cats[i].id==book.categoryId){
        category_ = cats[i].name;
      }
  }
  let placeholderImage = "https://via.placeholder.com/150?text=1984"
  return (
    <div className="book-card">
      <img src={book.image || `https://via.placeholder.com/150?text=${book.title}`} alt={book.title} />
      <h4>{book.title}</h4>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Genre:</strong> {category_}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <button onClick={EditButtonClicked}>✏️ Edit</button>
      <button onClick={DeleteButtonClicked}>🗑️ Delete</button>

      {/* Edit Modal */}
      {isEditing && (
        <EditBookModal
          book={book} // Pass the current book details to the modal
          onClose={() => setIsEditing(false)} // Close the modal
          onSubmit={handleEditSubmit} // Handle form submission
          isOpen={isEditing}
          cats={cats}
        />
      )}

        {/* Edit Modal */}
        {isDeleting && (
        <DeleteBookModal
          book={book} // Pass the current book details to the modal
          onClose={() => setIsDeleting(false)} // Close the modal
          onSubmit={deleteSubmit} // Handle form submission
          isOpen={isDeleting}
          
        />
      )}
    </div>
  );
}

export default BookCard;
