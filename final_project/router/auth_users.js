const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Returns true if a user with that username already exists
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};

const authenticatedUser = (username, password) => {
  // Checks if username and password match records
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  return validusers.length > 0;
};

// Task 8: Only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in. Username and password required" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password,
      username: username
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,
      username
    };

    return res.status(200).json({
      message: "User successfully logged in",
      token: accessToken
    });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 9: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review || req.body.review;
  const username = req.session?.authorization?.username || req.user?.username || req.user?.data;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book not found for the given ISBN ${isbn}` });
  }

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: `The review for the book with ISBN ${isbn} has been added/updated.`,
    reviews: books[isbn].reviews
  });
});

// Task 10: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session?.authorization?.username || req.user?.username || req.user?.data;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book not found for the given ISBN ${isbn}` });
  }

  if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({
      message: `Reviews for the ISBN ${isbn} posted by the user ${username} deleted.`,
      reviews: books[isbn].reviews
    });
  } else {
    return res.status(404).json({ message: `No review found by user ${username} for ISBN ${isbn}` });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
