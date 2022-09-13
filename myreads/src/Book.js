import { update } from "./BooksAPI.js";
import BookshelfChanger from './BookshelfChanger.js';
import PropTypes from 'prop-types';

/* This is an individual book that includes the thumbnail, title, and author.
 * When a book is changed shelves using the BookshelfChanger, this components
 * sends a query to the backend to update the book in the backend so the shelf
 * change persists.
 *
 * Props:
 *    book: object with book info
 *    onBookshelfChange: callback function to call if the shelf is changed.
 */
const Book = ({ book, onBookshelfChange }) => {

  // Calls the update function in the backend to update the book in the
  // database.
  async function saveBookshelfUpdate(newShelf) {
    const result = await update(book, newShelf);
    console.log(result);
  };

  const handleChangeBookshelf = (newShelf) => {
    onBookshelfChange(book.id, newShelf);
    saveBookshelfUpdate(newShelf);
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
            initialBookshelf={book.shelf ? book.shelf : "none"}
            onBookshelfChange={handleChangeBookshelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
};

export default Book;
