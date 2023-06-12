let myLibrary = [];

// Create constructor function
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Define method on prototype for efficiency
Book.prototype.info = function () {
    if (this.read == true) {
        return `${this.title} by ${this.author}`;
    }
    else if (this.read == false) {
        return `${this.title} by ${this.author}`;
    }
}


function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}


const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const title = document.getElementsByName('title')[0].value;
    const author = document.getElementsByName('author')[0].value;
    const pages = document.getElementsByName('pages')[0].value ;
    const read = document.getElementsByName('read_status')[0].checked;

    // Add book to array
    addBookToLibrary(title, author, pages, read);

    // Display the new book
    const len = myLibrary.length;
    printLibrary(len - 1);
})

function removeBookFromLibrary(index) {
    // Remove 1 element at 'index' position
    myLibrary.splice(index, 1);
}

// Display books beginning at index
function printLibrary(index) {
    const library = document.getElementById('library');

    for (let i = index, r = myLibrary.length; i < r; i++) {
        const book = document.createElement('article');
        book.innerText = myLibrary[i].info();
        library.appendChild(book);

        const bookCover = document.createElement('img');
        const author = myLibrary[i].author;
        const title = myLibrary[i].title;

        fetchCover(title, author);

    }
}

// Function to fetch covers from the Open Library API, written by ChatGPT
async function fetchCover(title, author) {
    const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
  
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      // Extract the first result
      const book = data.docs[0];
      if (!book) {
        console.log('No book found.');
        return;
      }
      
      const isbn = book.isbn && book.isbn[0];
      if (!isbn) {
        console.log('No ISBN found for the book.');
        return;
      }
      
      // Fetch the book cover
      const coverURL = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
      console.log('Book Cover URL:', coverURL);
      const bookArticle = document.querySelectorAll('section > article:last-child')[0];
      const imgElement = document.createElement('img');
      imgElement.src = coverURL;
      bookArticle.appendChild(imgElement);

      return coverURL;

    } catch (error) {
        console.log('Error:', error);
      }
}

// // Function to create an img element and set the src attribute
// function createBookCoverElement(coverUrl) {
//     const library = document.getElementById('library');

//     const imgElement = document.createElement('img');
//     imgElement.src = coverUrl;
    
//     library.appendChild(imgElement);
//   }

// // Function that calls fetchCover and creates the img element with the coverUrl
// async function handleBookSearch(title, author) {
//     const coverUrl = await fetchCover(title, author);
//     if (coverUrl) {
//       console.log('Book Cover URL:', coverUrl);
//       createBookCoverElement(coverUrl);
//     } else {
//       console.log('Cover URL not found.');
//     }
//   }


const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(book1);

printLibrary(0);






