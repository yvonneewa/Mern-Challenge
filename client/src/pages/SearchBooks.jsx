// SearchBooks.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

function SearchBooks() {
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (book) => {
    try {
      await saveBook({
        variables: { ...book },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* Render your search results here */}
      <button onClick={() => handleSaveBook(book)}>Save This Book!</button>
    </div>
  );
}

export default SearchBooks;
