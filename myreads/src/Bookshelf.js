import PropTypes from 'prop-types';
import Book from "./Book.js";
import LoadingIcon from "./icons/loading.gif";

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
