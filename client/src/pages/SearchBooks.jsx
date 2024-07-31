import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

function SearchBooks() {
  const [searchResults, setSearchResults] = useState([]); 
  const [saveBook] = useMutation(SAVE_BOOK);

  // Function to handle saving a book
  const handleSaveBook = async (book) => {
    try {
      await saveBook({
        variables: {
          bookId: book.bookId,
          authors: book.authors,
          description: book.description,
          title: book.title,
          image: book.image,
          link: book.link,
        },
      });

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Search Results</h1>
      <div>
        {searchResults.map((book) => (
          <div key={book.bookId}>
            <h2>{book.title}</h2>
            <p>{book.authors.join(', ')}</p>
            <p>{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} />}
            <a href={book.link} target="_blank" rel="noopener noreferrer">View on Google Books</a>
            <button onClick={() => handleSaveBook(book)}>
              Save This Book!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBooks;
