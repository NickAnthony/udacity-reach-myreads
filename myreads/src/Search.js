import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Search = () => {
  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
}

Search.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
};

export default Search;
