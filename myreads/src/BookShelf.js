import PropTypes from 'prop-types';
import Book from "./Book.js";

const BookShelf = ({ bookshelfTitle, books }) => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
              <Book
                key={book.title}
                currentShelf={bookshelfTitle}
                title={book.title}
                author={book.author}
                backgroundImageUrl={book.backgroundImageUrl}/>
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  prop: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default BookShelf;
