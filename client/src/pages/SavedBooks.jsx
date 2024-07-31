import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations'; // Ensure this is the correct path

function SavedBooks() {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Handle removing a book
  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });
      // Optionally, you might want to update the UI or notify the user
    } catch (e) {
      console.error('Error removing book:', e);
      // Optionally, provide user feedback here
    }
  };

  return (
    <div>
      <h1>Saved Books</h1>
      {data.me.savedBooks.length ? (
        data.me.savedBooks.map((book) => (
          <div key={book.bookId} style={{ marginBottom: '1rem' }}>
            <h3>{book.title}</h3>
            {book.image && <img src={book.image} alt={book.title} style={{ width: '100px', height: 'auto' }} />}
            <p>{book.description}</p>
            <button onClick={() => handleRemoveBook(book.bookId)}>Remove Book</button>
          </div>
        ))
      ) : (
        <p>No saved books found.</p>
      )}
    </div>
  );
}

export default SavedBooks;
