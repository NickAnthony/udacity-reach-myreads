import "./App.css";
import { useState } from "react";
import BookShelf from './BookShelf.js';
import { books } from './InitialBookData.js';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const bookshelves = ["Currently Reading", "Want to Read", "Read"];

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
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
                <BookShelf bookshelfTitle={bookshelfTitle}
                  books={booksInShelf}/>
              );
            })}
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
