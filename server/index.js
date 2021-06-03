var api = require('./src/api.js').app;
const fs = require('fs');
const booksfilepath = './src/books.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/books', function (request, response) {
  response.json(getBooks());
});

api.get('/books/:id', function (request, response) {
  let book = getBookById(request.params.id);
  if (book)
    response.json(book);

  response.json('Nu se află.');
});

api.put('/books', function (request, response) {
  saveBook(request.body);

  response.json('Cartea este adăugată cu succes.');
});

api.post('/books', function (request, response) {
  let book = request.body;
  let books = getBooks();
  for(let i=0; i < books.length; i++) {
    if (books[i].id === book.id) {
      books[i] = book;
    }
  }
  
  try {
    fs.writeFileSync(booksfilepath, JSON.stringify(books));
  } catch (err) {
    console.error(err)
  }

  response.json('Cartea este modificată cu succes.');
});

api.delete('/books/:index', function (request, response) {
    let books = getBooks();

    books.splice(findIdInArray(request.params.index),1);

    try {
            fs.writeFileSync(booksfilepath, JSON.stringify(books));
        } catch (err) {
            console.error(err)
        }

    response.json('Cartea cu indice ' + request.params.index + ' este ștearsă.');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getBooks() {
  let books = [];
  try {
    books = JSON.parse(fs.readFileSync(booksfilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return books;
}

function saveBook(book) {
  let books = getBooks();
  let maxId = getMaxId(books);  
  console.log(book);
  book.id = maxId+1;
  books.push(book);
  try {
    fs.writeFileSync(booksfilepath, JSON.stringify(books));
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(books) {
  let max = 0;
  for (var i=0; i<books.length;i++) {
    if(max < books[i].id) {
      max = books[i].id;
    }
  }
  return max;
}

function getBookById(id){
  let books = getBooks();
  let selectedBook = null;
  for(var i=0; i<books.length; i++) {
    if(id == books[i].id)
        selectedBook = books[i];
  }
      return selectedBook;
}

function findIdInArray(id){
    let books = getBooks();
    for(var i=0; i<books.length; i++) {
        if(id == books[i].id)
            return i;
      }
    return -1;
}