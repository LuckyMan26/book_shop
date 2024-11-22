import React, { useState } from 'react';
import './AddBookModal.css'; // Importing styles

const AddBookModal = ({ isOpen, onClose, onSubmit , cats_}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false); // State to handle dropdown visibility
  // Example array of categories
  console.log(cats_);
  const categories = cats_;

  const handleSubmit = () => {
    if (file !== undefined) {
    onSubmit({ title, author, image, publisher, description, pages, price, file, quantity, categoryId });
    }
    if (file === undefined) {
      onSubmit({ title, author, image, publisher, description, pages, price, quantity, categoryId });
      }
    onClose(); // Close the modal after submission
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile)); // Update preview with selected file
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowSuggestions(true); // Show suggestions when user starts typing
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat.name); // Set category to selected one
    setCategoryId(cat.id);
    setShowSuggestions(false); // Close the suggestions list
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(category.toLowerCase())
  );
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Add New Book</h2>
        
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        
        <input
          type="text"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="input-field"
        />
        
        <input
          type="text"
          placeholder="Book Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
          className="input-field"
        />

        <textarea
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input-field"
        />

        <input
          type="number"
          placeholder="Number of Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
          className="input-field"
        />
        
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="input-field"
        />
        
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="input-field"
        />
        
        {/* Category input with autocomplete feature */}
        <div className="autocomplete-container">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={handleCategoryChange}
            className="input-field"
          />
          {showSuggestions && category && filteredCategories.length > 0 && (
            <ul className="category-list">
              {filteredCategories.map((cat, index) => (
                <li
                  key={index}
                  className="category-item"
                  onClick={() => handleCategorySelect(cat)} // Use the handler to close the list and set the category
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="file-upload">
          <label className="file-label">Upload Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>

        <div className="button-container">
          <button className="submit-btn" onClick={handleSubmit}>Add Book</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
