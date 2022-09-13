import { Link } from "react-router-dom";
import { search } from "./BooksAPI.js";
import { useEffect, useState } from 'react';
import Book from "./Book.js";
import LoadingIcon from "./icons/loading.gif";


const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  }

  useEffect(() => {
    var isMounted = true;
    setLoading(true);

    const getSearch = async(customString) => {
      const finalSearchString = customString ? customString : searchString;
      try {
        const res = await search(finalSearchString, 20);
        if (!res || "error" in res) {
          setSearchResults([]);
          setLoading(false);
          return;
        }
        const newSearchResults = res.map((book) => {
          var backgroundImageUrl = "";
          if ("imageLinks" in book) {
            if ("thumbnail" in book.imageLinks) {
              backgroundImageUrl = book.imageLinks.thumbnail;
            } else if ("smallThumbnail" in book.imageLinks) {
              backgroundImageUrl = book.imageLinks.smallThumbnail;
            }
          }
          var author = "";
          if ("authors" in book) {
            author = book.authors.lenth ? book.authors[0] : "";
          }
          return (
            {
              id: book.id,
              title: book.title,
              author: author,
              backgroundImageUrl: backgroundImageUrl,
              bookshelf: "None",
            }
          );
        });
        if (isMounted) {
          setSearchResults(newSearchResults);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching books data.")
        console.log(error);
        setSearchResults([]);
        setLoading(false);
      }
    };

    var newTimer;
    if (searchString === "") {
      // Empty string, we want to do a random search.
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomSearch = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      newTimer = setTimeout(() => {
        getSearch(randomSearch);
      }, 0);

    } else {
      // Any other mount, we want to use the search query they provided.
      newTimer = setTimeout(() => {
        getSearch();
      }, 1000);
    }

    return function cleanup() {
      // Clean up the previous timer if it hasn't executed by the time the new
      // search string is updated.
      clearTimeout(newTimer);
      isMounted = false;
    };
  }, [searchString]);

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
            vaue={searchString}
            onChange={handleSearchStringChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {loading &&
            <img src={LoadingIcon} alt="Loading Icon" className="loading-icon"/>
          }
          {/* We can pass an empty onBookshelfChange function because it won't
            * need updating here. */}
          {!loading && searchResults.map((book) =>
              <Book
                key={book.id}
                book={book}
                onBookshelfChange={(id, newShelf) => {}}/>
          )}
          {!loading && (searchResults.length === 0) && <p>Seach returned no results</p>}
        </ol>
      </div>
    </div>
  );
}

export default Search;
