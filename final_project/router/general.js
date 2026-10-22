const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 7: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    users.push({ "username": username, "password": password });
    return res.status(200).json({ message: "User successfully registered. Now you can login" });
  } else {
    return res.status(404).json({ message: "User already exists!" });
  }
});

// Task 2: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 3: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({ message: "Book not found for the given ISBN" });
  }
});

// Task 4: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  let matchingBooks = {};

  Object.keys(books).forEach((key) => {
    if (books[key].author.toLowerCase() === author || books[key].author.toLowerCase().includes(author)) {
      matchingBooks[key] = books[key];
    }
  });

  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found for the given author" });
  }
});

// Task 5: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  let matchingBooks = {};

  Object.keys(books).forEach((key) => {
    if (books[key].title.toLowerCase() === title || books[key].title.toLowerCase().includes(title)) {
      matchingBooks[key] = books[key];
    }
  });

  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found for the given title" });
  }
});

// Task 6: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found for the given ISBN" });
  }
});

// ==============================================================================
// Task 11 Submission: Tasks 10-13 Asynchronous implementations using Axios
// with Promise callbacks and async/await
// ==============================================================================

const BASE_URL = 'http://localhost:5000';

// Task 10: Get the list of books available in the shop using async/await with Axios
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    throw error;
  }
};

// Task 10 (Alternative): Get the list of books using Promise callbacks with Axios
const getAllBooksWithPromise = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// Task 11: Get book details based on ISBN using Promise callbacks with Axios
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/isbn/${isbn}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// Task 11 (Alternative): Get book details based on ISBN using async/await with Axios
const getBookByISBNAsync = async (isbn) => {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    throw error;
  }
};

// Task 12: Get book details based on Author using async/await with Axios
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error.message);
    throw error;
  }
};

// Task 12 (Alternative): Get book details based on Author using Promise callbacks with Axios
const getBooksByAuthorWithPromise = (author) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// Task 13: Get book details based on Title using async/await with Axios
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by title ${title}:`, error.message);
    throw error;
  }
};

// Task 13 (Alternative): Get book details based on Title using Promise callbacks with Axios
const getBooksByTitleWithPromise = (title) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getAllBooksWithPromise = getAllBooksWithPromise;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBookByISBNAsync = getBookByISBNAsync;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByAuthorWithPromise = getBooksByAuthorWithPromise;
module.exports.getBooksByTitle = getBooksByTitle;
module.exports.getBooksByTitleWithPromise = getBooksByTitleWithPromise;
