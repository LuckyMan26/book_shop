import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookCard from './components/BookCard';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', image: '', publisher: '', pages: '', description: '', file: '',price:'' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([])

  var authors = [];
  for(var i=0;i < books.length;i++){
    authors.push(books[i].author);
  }

  const booksPerPage = 16;
  const fetchImageById = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/images/getById/${imageId}`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      console.log(blob);
      return URL.createObjectURL(blob); // Convert the image blob to a URL
    } catch (error) {
      console.error('Error fetching image:', error);
      return null; // Return null if there's an error
    }
  };
  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/book?page=0&size=16`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      console.log('Books fetched:', data);
  
      // Fetch images for each book
      const booksWithImages = await Promise.all(
        data.map(async (book) => {
          console.log('fetching images');
          const imageUrl = book.imageId ? await fetchImageById(book.imageId) : null;
          return { ...book, image: imageUrl }; // Replace image ID with the fetched image URL
        })
      );
  
      setBooks(booksWithImages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

const fetchCategories = async () => {
  const apiUrl = `http://localhost:8080/api/v1/category`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  const categories = await response.json();
  setCategories(categories)
  console.log('Categories fetched:', categories);

  }
  // Fetch books only when the page loads
  useEffect(() => {
    fetchBooks();
    fetchCategories()
  }, []); // Empty dependency array ensures this runs only on component mount

  const addBook = (book) => {
    console.log(book);
    
    const temp = {'title':book.title,'author':book.author,'description':book.description,'pages':book.pages,'publisher':book.publisher, 'categoryId': book.categoryId, 'quantity':book.quantity, 'price':book.price}

    let bookId; 
    if (book.title.trim() && book.author.trim()) {
      fetch('http://localhost:8080/api/v1/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(temp),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("push results");
          console.log(data.id);
          bookId = data.id;
          setBooks([...books, data]); // Assuming books and setBooks are part of state
          bookId = data.id;
          setNewBook({ title: '', author: '', image: '' }); // Clear form
          if(book.file){
          const formData = new FormData();
          
          formData.append('image', book.file); 
          formData.append('bookId', data.id); 
          
            const imageResponse = fetch('http://localhost:8080/api/v1/images', {
              method: 'POST',
              headers: {
                
                'Access-Control-Allow-Origin': '*',
              },
              body: formData,
            });
        }}).catch((error) => {
          console.error('Error adding book:', error);
        })
    }
    console.log('book id: ' + bookId);
   
     
    
  };
  

  const editBook = (updatedBook) => {
    console.log(updatedBook);
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    console.log('updated book' + updatedBook.categoryId);
    const formData = new FormData();
      
    formData.append('image', updatedBook.image); 
    formData.append('bookId', updatedBook.id); 

    console.log('formdata');
    fetch(`http://localhost:8080/api/v1/images`, {
      method: 'POST',
      headers: {
        
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    })
    .catch((error) => {
      console.error('Error updating book:', error);
    });
  
    fetch(`http://localhost:8080/api/v1/book`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(updatedBook),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Book updated:', data);
    })
    .catch((error) => {
      console.error('Error updating book:', error);
    });
  };

  const deleteBook = (id) => {
    console.log(id);
    var body = {'id':id};
    let apiUrl = "http://localhost:8080/api/v1/book/" + id;
    console.log(apiUrl);
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        
        'Access-Control-Allow-Origin': '*',
      },
      //body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Book deleted:', data);
    })
    .catch((error) => {
      console.error('Error updating book:', error);
    });
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthorFilter = selectedAuthor ? book.author === selectedAuthor : true;
    return matchesSearchTerm && matchesAuthorFilter;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="authors-list">
          <h3>Authors</h3>
          <ul>
            {authors.map((author) => (
              <li
                key={author}
                onClick={() => setSelectedAuthor(author)}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedAuthor === author ? 'bold' : 'normal',
                  color: selectedAuthor === author ? '#61dafb' : 'inherit',
                }}
              >
                {author}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main>
        <Header addBook={addBook} setNewBook={setNewBook} cats={categories}/>

        <div className="grid-container">
          {currentBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              cats={categories}
              
              editBook={editBook}
              deleteBook={deleteBook}
            />
          ))}
        </div>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
