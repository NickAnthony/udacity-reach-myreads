import PropTypes from 'prop-types';

const Search = ({ onCloseSearch }) => {
  return(
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => onCloseSearch()}
        >
          Close
        </a>
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
