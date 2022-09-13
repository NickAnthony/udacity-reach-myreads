import Book from "./Book.js";
import LoadingIcon from "./icons/loading.gif";
import PropTypes from 'prop-types';

/* Individual shelf within the top level home page.  It displays a list of
 * Books as provided by books (books in this shelf).
 *
 * Props:
 *    bookshelfTitle: title of this booksInShelf
 *    books: array of books in this shelf
 *    onBookshelfChange: callback function to pass to Book to update the shelf
 *        if it changes.
 *    loading: whether or not the application is loading, aka waiting on data
 *        from the server
 */
const Bookshelf = ({ bookshelfTitle, books, onBookshelfChange, loading }) => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {loading &&
            <img src={LoadingIcon} alt="Loading Icon" className="loading-icon"/>
          }
          {!loading && books.map((book) =>
              <Book
                key={book.id}
                book={book}
                onBookshelfChange={onBookshelfChange}/>
          )}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  bookshelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Bookshelf;
