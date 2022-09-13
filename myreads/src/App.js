import "./App.css";
import { bookshelves } from "./BookshelfTitles.js";
import { getAll } from "./BooksAPI.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Bookshelf from './Bookshelf.js';

/* Top level component that handles the home page.  It displays 3 bookshelves
 * and contains the list of books for each shelf.  Switching of shelves within
 * the UI is handled here, whereas switching of shelves in the backend is
 * handled in the Book component so that the Search component can change
 * bookshelves.
 *
 * On render, it loads the books from the backend.
 *
 * Props:
 *    None, rendered directly from react router for "/"
 */
function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var isMounted = true;
    setLoading(true);
    // Define getBooks
    const getBooks = async () => {
      const res = await getAll();
      const allBooks = res.map((book) => {
        // Thumbnails are not gauranteed to exist, so we need to avoid null
        // references by creating a backgroundImageUrl field.
        var backgroundImageUrl = "";
        if ("imageLinks" in book) {
          if ("thumbnail" in book.imageLinks) {
            backgroundImageUrl = book.imageLinks.thumbnail;
          } else if (("smallThumbnail" in book.imageLinks)) {
            backgroundImageUrl = book.imageLinks.smallThumbnail;
          }
        }
        book.backgroundImageUrl = backgroundImageUrl;
        return book;
      });

      if (isMounted) {
        setBooks(allBooks);
        setLoading(false);
      }
    };
    // Call getBooks
    getBooks();

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  const bookshelfIsValid = (shelfToCheck) => {
    const matched = bookshelves.filter((shelf) => (shelf.id === shelfToCheck));
    return matched.length ? true : false;
  }

  const handleChangeBookshelf = (bookIdToUpdate, newShelf) => {
    // Handle the None case - remove it from the state completely.
    if (newShelf === "none") {
      const remainingBooks = books.filter((book) => (book.id !== bookIdToUpdate));
      setBooks(remainingBooks);
      return true;
    }

    if (!bookshelfIsValid(newShelf)) {
      // This shouldn't happen, so log any call that try to update a book to
      // the shelf that doesn't exist.
      console.log(`handleChangeBookshelf - '${newShelf}' is not a known shelf.  Skipping update.`);
      return false;
    }
    // Iterate through the array and update the appropriate book.
    const updatedBooks = books.map((book) => {
      if (book.id === bookIdToUpdate) {
        // This shouldn't happen, so log any call that try to update a book to
        // the shelf it's already in.
        if (book.shelf === newShelf) {
          console.log(`handleChangeBookshelf - book ${book.id} is already in shelf ${newShelf}!  Skipping update.`)
        }
        book.shelf = newShelf;
      }
      return book;
    });
    // Finally update the state with the new array.
    setBooks(updatedBooks);
    return true;
  }

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {bookshelves.map((bookshelf) => {
            const booksInShelf = books.filter(
              (book) => (book.shelf === bookshelf.id)
            );
            return (
              <Bookshelf
                key={bookshelf.id}
                bookshelfTitle={bookshelf.title}
                books={booksInShelf}
                onBookshelfChange={handleChangeBookshelf}
                loading={loading}/>
            );
          })}
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
