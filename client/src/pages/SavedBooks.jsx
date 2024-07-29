// SavedBooks.jsx
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

function SavedBooks() {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  if (loading) return <p>Loading...</p>;

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {data.me.savedBooks.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          <button onClick={() => handleRemoveBook(book.bookId)}>Remove Book</button>
        </div>
      ))}
    </div>
  );
}

export default SavedBooks;
