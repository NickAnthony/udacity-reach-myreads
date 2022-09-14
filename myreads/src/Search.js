import { Link } from "react-router-dom";
import { search, getAll } from "./BooksAPI.js";
import { useEffect, useState } from 'react';
import Book from "./Book.js";
import LoadingIcon from "./icons/loading.gif";

/* This lets users search and add new books to their shelves.  On render, if the
 * search string is empty, it does a search for a random character in the
 * alphabet. This creates a nice "did you consider" UX.
 * Then when the user types their query, it does a query to the backend once the
 * user has stopped typing for 1 second.
 *
 * Props:
 *    None, rendered directly from react router for "/serach"
 */
const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBooks, setCurrentBooks] = useState([]);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  }

  // Get all books effect.  We just need to do this on the first render because
  // any updates to the books will persist.
  useEffect(() => {
    var isMounted = true;
    // Reset search string to on each initial load.
    setSearchString("");

    const getCurrentBooks = async() => {
      try {
        const books = await getAll();
        if (!books || "error" in books) {
          return;
        }
        if (isMounted) {
          setCurrentBooks(books);
        }
      } catch (error) {
        console.log("Error fetching books data.")
        console.log(error);
      }
    };

    getCurrentBooks();
    return function cleanup() {
      isMounted = false;
    };
  }, []);

  // Search Effect - does the search on changes to Search String
  useEffect(() => {
    var isMounted = true;
    console.log(`Search string: |${searchString}|`);

    const getSearch = async() => {
      try {
        const res = await search(searchString.trim(), 20);
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
      setLoading(false);
      setSearchResults([]);
    } else {
      setLoading(true);
      // Any other mount, we want to use the search query they provided.
      newTimer = setTimeout(() => {
        getSearch();
      }, 400);
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
          {!loading && searchResults.map((book) => {
            // If the book is already on a shelf, update it to show so!
            const match = currentBooks.filter((currentBook) => (currentBook.id === book.id));
            if (match.length > 0) {
              book.shelf = match[0].shelf;
            }
            return (
                <Book
                  key={book.id}
                  book={book}
                  onBookshelfChange={(id, newShelf) => {}}/>
            );
          })}
          {!loading && searchString !== "" && searchResults.length <= 0 &&
            <p>Seach returned no results</p>}
        </ol>
      </div>
    </div>
  );
}

export default Search;
