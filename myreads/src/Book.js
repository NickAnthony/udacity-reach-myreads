import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger.js';
import { update } from "./BooksAPI.js";

const Book = ({ book, onBookShelfChange }) => {

  async function saveBookshelfUpdate(newShelf) {
    const result = await update(book, newShelf);
    console.log(result);
  };

  const handleChangeBookshelf = (newShelf) => {
    onBookShelfChange(book.id, newShelf);
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
            onBookShelfChange={handleChangeBookshelf}/>
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
