import PropTypes from 'prop-types';
import Book from "./Book.js";

const Bookshelf = ({ bookshelfTitle, books, onBookshelfChange }) => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
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
};

export default Bookshelf;
