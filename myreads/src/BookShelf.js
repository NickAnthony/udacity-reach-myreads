import PropTypes from 'prop-types';
import Book from "./Book.js";

const BookShelf = ({ bookshelfTitle, books, onBookShelfChange }) => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
              <Book
                key={book.id}
                book={book}
                onBookShelfChange={onBookShelfChange}/>
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  bookshelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
};

export default BookShelf;
