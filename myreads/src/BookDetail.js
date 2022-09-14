import BookshelfChanger from './BookshelfChanger.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { update, get } from "./BooksAPI.js";
import LoadingIcon from "./icons/loading.gif";
import { Link } from "react-router-dom";

/* This is a detailed view of an individual book that includes the thumbnail,
 * title, subtitle, authors, description, and publish date.  This is viewed when
 * a user clicks on the thumbnail image of a book.
 * It uses the id from the route to determine which book to show.
 * When a book is changed shelves using the BookshelfChanger, this components
 * sends a query to the backend to update the book in the backend so the shelf
 * change persists.
 *
 * Props:
 *    None - the id the book is provided in the route.
 */
const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var isMounted = true;
    setLoading(true);

    const getBook = async() => {
      try {
        const book = await get(id);
        if (!book || "error" in book) {
          setLoading(false);
          return;
        }
        // Thumbnails are not gauranteed to exist, so we need to avoid null
        // references by creating a backgroundImageUrl field.
        var backgroundImageUrl = "";
        if ("imageLinks" in book) {
          if ("thumbnail" in book.imageLinks) {
            backgroundImageUrl = book.imageLinks.thumbnail;
          } else if ("smallThumbnail" in book.imageLinks) {
            backgroundImageUrl = book.imageLinks.smallThumbnail;
          }
        }
        book.backgroundImageUrl = backgroundImageUrl;
        // publishedDate is either a year or a date, so let's resolve to one.
        book.publishYear = book.publishedDate.substring(0,4);
        if (isMounted) {
          setBook(book);
          setLoading(false);
        }
      } catch (error) {
        console.log(`Error fetching book with id ${id}.`)
        console.log(error);
      }
    };

    getBook();
    return function cleanup() {
      isMounted = false;
    };
  }, [id]);

  // Calls the update function in the backend to update the book in the
  // database.
  async function saveBookshelfUpdate(newShelf) {
    const result = await update(book, newShelf);
    console.log(result);
  };

  const handleChangeBookshelf = (newShelf) => {
    saveBookshelfUpdate(newShelf);
  }

  return(
    <div>
      <div className="list-books-title">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>MyReads</h1>
        </Link>
      </div>
      <Link className="close-search" to="/">
        Close
      </Link>
      <div className="book-detail-container">

        {loading && <img src={LoadingIcon} alt="Loading Icon" className="loading-icon"/>}
        {!loading &&
          <div className="book-detail-background">
            <div className="book-detail-left">
              <div
                className="book-detail-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage:
                    `url("${book.backgroundImageUrl}")`,
                }}>
              </div>
              <div className="book-shelf-detail-changer">
                <BookshelfChanger
                  initialBookshelf={book.shelf ? book.shelf : "none"}
                  onBookshelfChange={handleChangeBookshelf}/>
              </div>
            </div>
            <div className="book-detail-right">
              <div className="book-detail-title">{book.title}</div>
              <div className="book-detail-subtitle">{book.subtitle}</div>

              {book.authors.map((author) => (
                <div key={author} className="book-detail-authors">{author}</div>
              ))}
              <div className="book-detail-item">
                <p><strong>Description</strong>: {book.description}</p>
              </div>
              <div className="book-detail-item">
                <p>{`Published in ${book.publishYear} by ${book.publisher}`}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default BookDetail;
