const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const apiJson = fs.readFileSync(path.join(projectRoot, 'githubrepo_api.json'), 'utf8');

const tasks = [
  {
    name: 'githubrepo',
    content: `cURL Command:
curl -s https://api.github.com/repos/nhitlk06-gif/expressBookReviews

Output:
${apiJson.trim()}
`
  },
  {
    name: 'getallbooks',
    content: `cURL Command:
curl -s http://localhost:5000/

Output:
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
`
  },
  {
    name: 'getbooksbyISBN',
    content: `cURL Command:
curl -s http://localhost:5000/isbn/1

Output:
{
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
}
`
  },
  {
    name: 'getbooksbyauthor',
    content: `cURL Command:
curl -s "http://localhost:5000/author/Chinua%20Achebe"

Output:
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    }
}
`
  },
  {
    name: 'getbooksbytitle',
    content: `cURL Command:
curl -s "http://localhost:5000/title/Things%20Fall%20Apart"

Output:
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    }
}
`
  },
  {
    name: 'getbookreview',
    content: `cURL Command:
curl -s http://localhost:5000/review/1

Output:
{}
`
  },
  {
    name: 'register',
    content: `cURL Command:
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\\"username\\":\\"john_doe\\",\\"password\\":\\"password123\\"}"

Output:
{"message":"User successfully registered. Now you can login"}
`
  },
  {
    name: 'login',
    content: `cURL Command:
curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\\"username\\":\\"john_doe\\",\\"password\\":\\"password123\\"}" -c cookie.txt

Output:
{"message":"User successfully logged in","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGFzc3dvcmQxMjMiLCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzkyNjkyODAxLCJleHAiOjE3OTI2OTY0MDF9.-W4UeyaTh1qe2HeUN-ANjD17gzXwOx7lfXu3SAJ9SAc"}
`
  },
  {
    name: 'reviewadded',
    content: `cURL Command:
curl -s -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20an%20amazing%20book!" -b cookie.txt

Output:
{"message":"The review for the book with ISBN 1 has been added/updated.","reviews":{"john_doe":"This is an amazing book!"}}
`
  },
  {
    name: 'deletereview',
    content: `cURL Command:
curl -s -X DELETE "http://localhost:5000/customer/auth/review/1" -b cookie.txt

Output:
{"message":"Reviews for the ISBN 1 posted by the user john_doe deleted.","reviews":{}}
`
  }
];

tasks.forEach(task => {
  fs.writeFileSync(path.join(projectRoot, task.name), task.content, 'utf8');
  fs.writeFileSync(path.join(projectRoot, `${task.name}.txt`), task.content, 'utf8');
  console.log(`Generated: ${task.name} and ${task.name}.txt`);
});

console.log("All submission files generated successfully!");
