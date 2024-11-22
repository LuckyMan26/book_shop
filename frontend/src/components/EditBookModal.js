import React, { useState, useEffect } from 'react';
import './EditBookModal.css'; // Make sure the styles are linked correctly

const EditBookModal = ({ isOpen, onClose, book, onSubmit, cats}) => {
  console.log(book);
  const [id, setId] = useState(book.id);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price);
  const [description, setDescription] = useState(book.description);
  const [quantity, setQuantity] = useState(book.quantity);
  const [pages, setPages] = useState(book.pages);
  const [publisher, setPublisher] = useState(book.publisher);
  const [image, setImage] = useState(book.image);
  const [file, setFile] = useState(null);
  var category_;
  for(var i = 0; i <cats.length;i++){
      if (cats[i].id==book.categoryId){
        category_ = cats[i].name;
      }
  }
  const [category, setCategory] = useState(category_);
  const [categoryId, setCategoryId] = useState(book.categoryId);
  const [showSuggestions, setShowSuggestions] = useState(false); // State to handle dropdown visibility
  // Sync state with incoming prop when modal is opened

  const categories = cats;
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile)); // Update preview
    }
  };

  const handleSubmit = () => {
    book = {'id': id, 'title':title, 'author':author,'categoryId':categoryId,'publisher':publisher,'pages':pages,'description':description, 'image':file, 'quantity':quantity,'price':price }
    console.log(id);
    onSubmit(book);
    onClose(); // Close the modal after submission
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

  console.log('isOpen ' + isOpen);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Book</h2>
  
        <label className="input-label">
          Book Title:
          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Book Author:
          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Price:
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Publisher:
          <input
            type="text"
            placeholder="Enter publisher name"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Description:
          <textarea
            placeholder="Enter book description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Number of Pages:
          <input
            type="number"
            placeholder="Enter number of pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Quantity:
          <input
            type="number"
            placeholder="Enter quantity available"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-field"
          />
        </label>
  
        <label className="input-label">
          Category:
          <div className="autocomplete-container">
            <input
              type="text"
              placeholder="Enter or select a category"
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
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
  
        <label className="input-label">
          Upload Book Cover:
          <div className="file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {image && <img src={image} alt="Preview" className="image-preview" />}
          </div>
        </label>
  
        <div className="button-container">
          <button className="submit-btn" onClick={handleSubmit}>Save Changes</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )};

export default EditBookModal;