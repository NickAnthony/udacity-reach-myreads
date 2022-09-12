import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { bookshelves } from "./BookshelfTitles.js";


const BookshelfChanger = ({ initialBookshelf, onBookShelfChange }) => {
  const [currentBookshelf, setCurrentBookshelf] = useState(initialBookshelf);

  // Set the state to the props on every change to props.
  useEffect(() => {
    setCurrentBookshelf(currentBookshelf);
  }, [currentBookshelf]);

  const handleBookshelfChange = (e) => {
    const newShelf = e.target.value;
    setCurrentBookshelf(newShelf);
    onBookShelfChange(newShelf);
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
  onBookShelfChange: PropTypes.func.isRequired,
};

export default BookshelfChanger;
