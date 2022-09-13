# MyReads Project

Manage your reading list with MyReads!  This project lets you manage three
separate shelves and query the database to find new books to read.

## Launching the project

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Files

```bash
### `CONTRIBUTING.md
### `README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # Custom MyReads favicon.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app.
    ├── App.js # Root of the application and creates the 3 shelves we need to show.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Icons used throughout the application.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # Used for DOM rendering only.  Contains React Router.
    ├── Bookshelf.js # Used
    ├── Book.js # Used
    ├── BookshelfChanger.js # Used
    ├── BookshelfTitles.js # Maps bookshelf IDs to their readable titles.
    ├── Search.js # Uses the backend book search API to find new books based off the users' query.
    └── Template.js # Just a template React file, used for easily creating new
```

## Components

### `App`

Top level component that handles the home page.  It displays 3 bookshelves and
contains the list of books for each shelf.  Switching of shelves within the UI
is handled here, whereas switching of shelves in the backend is handled in the
Book component so that the Search component can change bookshelves.

On render, it loads the books from the backend.

### `Bookshelf`

Individual shelf within the top level home page.  It displays a list of Book
components.

### `Book`

This is an individual book that includes the thumbnail, title, and author.  When
a book is changed shelves using the BookshelfChanger, this components sends a
query to the backend to update the book in the backend so the shelf change
persists.

### `BookshelfChanger`

This is the drop down component that lets users select the shelf that book is
on.

### `BookshelfTitles`

This file contains a mapping of bookshelf ID to bookshelf title.

### `Search`

This lets users search and add new books to their shelves.  On render, if the
search string is empty, it does a search for a random character in the alphabet.
This creates a nice "did you consider" UX.

Then when the user types their query, it does a query to the backend once the
user has stopped typing for 1 second.

### `Template`

This is just a default template that makes creating new components easier.


## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
