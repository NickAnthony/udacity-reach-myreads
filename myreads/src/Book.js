import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger.js';

const Book = ({ book, onBookShelfChange }) => {
  const handleChangeBookshelf = (newShelf) => {
    onBookShelfChange(book.id, newShelf);
  }
  return(
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url("${book.backgroundImageUrl}")`,
            }}
          ></div>
          <BookshelfChanger
            onBookShelfChange={handleChangeBookshelf}
            bookshelf={book.bookshelf}
            />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
};

export default Book;
