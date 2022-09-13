import { bookshelves } from "./BookshelfTitles.js";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/* This is the drop down component that lets users select the shelf that book is
 * on.
 *
 * Props:
 *    initialBookshelf: the initial bookshelf of the parent Book
 *    onBookshelfChange: callback function to call if the shelf is changed.
 */
const BookshelfChanger = ({ initialBookshelf, onBookshelfChange }) => {
  const [currentBookshelf, setCurrentBookshelf] = useState(initialBookshelf);

  // Set the state to the props on every change to props.
  useEffect(() => {
    setCurrentBookshelf(currentBookshelf);
  }, [currentBookshelf]);

  const handleBookshelfChange = (e) => {
    const newShelf = e.target.value;
    setCurrentBookshelf(newShelf);
    onBookshelfChange(newShelf);
  }

  return(
    <div className="book-shelf-changer">
      <select value={currentBookshelf} onChange={handleBookshelfChange}>
        <option value="disabled" disabled>
          Move to...
        </option>
        {bookshelves.map((shelf) => (
          <option key={shelf.id} value={shelf.id}>
            {shelf.title}
          </option>
        ))}
        <option value="none">
          None
        </option>
      </select>
    </div>
  );
}

BookshelfChanger.propTypes = {
  initialBookshelf: PropTypes.string.isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
};

export default BookshelfChanger;
