import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const BookshelfChanger = ({ bookshelf, onBookShelfChange }) => {
  const [currentBookshelf, setCurrentBookshelf] = useState(bookshelf);

  // Set the state to the props on every change to props.
  useEffect(() => {
    setCurrentBookshelf(bookshelf);
  }, [bookshelf]);

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
        <option value="Currently Reading">
          Currently Reading
        </option>
        <option value="Want to Read">Want to Read</option>
        <option value="Read">Read</option>
        <option value="None">None</option>
      </select>
    </div>
  );
}

BookshelfChanger.propTypes = {
  bookshelf: PropTypes.string.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
};

export default BookshelfChanger;
