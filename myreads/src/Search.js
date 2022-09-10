import { Link } from "react-router-dom";
import { search } from "./BooksAPI.js";
import { useEffect, useState } from 'react';
import Book from "./Book.js";


const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [firstMount, setFirstMount] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  }

  useEffect(() => {
    var newTimer;
    if (firstMount) {
      // First mount, we want to do a random search.
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const firstSearch = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      newTimer = setTimeout(() => {
        getSearch(firstSearch);
      }, 0);
      setFirstMount(false);
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
    };
  }, [searchString]);

  const getSearch = async(customString) => {
    const finalSearchString = customString ? customString : searchString;
    // If we have results and the search string is empty, let's keep them.
    if (searchResults.length > 0 && finalSearchString === "") {
      return;
    }
    try {
      const res = await search(finalSearchString, 20);
      if (!res || "error" in res) {
        setSearchResults([]);
        return;
      }
      const newSearchResults = res.map((book) => {
        var backgroundImageUrl = "";
        if (("imageLinks" in book) && ("thumbnail" in book.imageLinks)) {
          backgroundImageUrl = book.imageLinks.thumbnail;
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
      setSearchResults(newSearchResults);
    } catch (error) {
      console.log("Error fetching books data.")
      console.log(error);
      setSearchResults([]);
    }
  };

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
          {searchResults.map((book) =>
              <Book
                key={book.id}
                book={book}
                onBookShelfChange={() => {}}/>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
