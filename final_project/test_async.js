const {
  getAllBooks,
  getAllBooksWithPromise,
  getBookByISBN,
  getBookByISBNAsync,
  getBooksByAuthor,
  getBooksByAuthorWithPromise,
  getBooksByTitle,
  getBooksByTitleWithPromise
} = require('./router/general.js');

async function runTests() {
  console.log("=== Testing Task 10: getAllBooks (async/await) ===");
  const allBooks = await getAllBooks();
  console.log("Found books count:", Object.keys(allBooks).length);

  console.log("\n=== Testing Task 10: getAllBooksWithPromise ===");
  const allBooksPromise = await getAllBooksWithPromise();
  console.log("Found books count (Promise):", Object.keys(allBooksPromise).length);

  console.log("\n=== Testing Task 11: getBookByISBN (Promise) ===");
  const book1 = await getBookByISBN(1);
  console.log("ISBN 1 Title:", book1.title);

  console.log("\n=== Testing Task 11: getBookByISBNAsync (async/await) ===");
  const book2 = await getBookByISBNAsync(2);
  console.log("ISBN 2 Title:", book2.title);

  console.log("\n=== Testing Task 12: getBooksByAuthor (async/await) ===");
  const authorBooks = await getBooksByAuthor('Chinua Achebe');
  console.log("Books by Chinua Achebe:", Object.keys(authorBooks).length);

  console.log("\n=== Testing Task 12: getBooksByAuthorWithPromise (Promise) ===");
  const authorBooksPromise = await getBooksByAuthorWithPromise('Jane Austen');
  console.log("Books by Jane Austen:", Object.keys(authorBooksPromise).length);

  console.log("\n=== Testing Task 13: getBooksByTitle (async/await) ===");
  const titleBooks = await getBooksByTitle('Things Fall Apart');
  console.log("Books with title 'Things Fall Apart':", Object.keys(titleBooks).length);

  console.log("\n=== Testing Task 13: getBooksByTitleWithPromise (Promise) ===");
  const titleBooksPromise = await getBooksByTitleWithPromise('Fairy tales');
  console.log("Books with title 'Fairy tales':", Object.keys(titleBooksPromise).length);

  console.log("\nAll async/await and Promise Axios tests passed successfully!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
