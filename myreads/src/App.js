import "./App.css";
import { useState } from "react";
import BookShelf from './BookShelf.js';
import { initialBookData } from './InitialBookData.js';
import Search from "./Search.js";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState(initialBookData);

  const bookshelves = ["Currently Reading", "Want to Read", "Read"];

  const handleChangeBookShelf = (bookIdToUpdate, newShelf) => {
    // Handle the None case - remove it from the state completely.
    if (newShelf === "None") {
      const remainingBooks = books.filter((book) => (book.id !== bookIdToUpdate));
      setBooks(remainingBooks);
      return true;
    }

    if (!bookshelves.includes(newShelf)) {
      // This shouldn't happen, so log any call that try to update a book to
      // the shelf that doesn't exist.
      console.log(`handleChangeBookShelf - '${newShelf}' is not a known shelf.  Skipping update.`)
      return false;
    }
    // Iterate through the array and update the appropriate book.
    const updatedBooks = books.map((book) => {
      if (book.id === bookIdToUpdate) {
        // This shouldn't happen, so log any call that try to update a book to
        // the shelf it's already in.
        if (book.bookshelf === newShelf) {
          console.log(`handleChangeBookShelf - book ${book.id} is already in shelf ${newShelf}!  Skipping update.`)
        }
        book.bookshelf = newShelf;
      }
      return book;
    });
    // Finally update the state with the new array.
    setBooks(updatedBooks);
    return true;
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <Search onCloseSearch={() => setShowSearchpage(false)}/>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {bookshelves.map((bookshelfTitle) => {
              const booksInShelf = books.filter(
                (book) => (book.bookshelf === bookshelfTitle)
              );
              return (
                <BookShelf
                  key={bookshelfTitle}
                  bookshelfTitle={bookshelfTitle}
                  books={booksInShelf}
                  onBookShelfChange={handleChangeBookShelf}/>
              );
            })}
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
