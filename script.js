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

// Create new Book object
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

// Get the form
const form = document.querySelector('form');
// When form is submitted, add Book and display it
form.addEventListener('submit', event => {
    event.preventDefault();

    const title = document.getElementsByName('title')[0].value;
    const author = document.getElementsByName('author')[0].value;
    const pages = document.getElementsByName('pages')[0].value ;
    const read = document.getElementsByName('read_status')[0].checked;

    // Add book to array
    addBookToLibrary(title, author, pages, read);

    // Display the new book
    updateLibrary();
})

// Remove book from myLibrary 
function removeBookFromLibrary(index) {
    // Remove 1 element at 'index' position
    myLibrary.splice(index, 1);
}

// Update 'read' from true to false and vice versa
function changeReadState(index) {
    const state = myLibrary[index].read;
    if (state === true) {
        myLibrary[index].read = false;
    }
    else {
        myLibrary[index].read = true;
    }
    return myLibrary[index].read;
}


function updateLibrary() {
    // Get the library
    const library = document.getElementById('library');
    // Get the index of the latest Book object
    const latestBook = myLibrary.length - 1;

    // Create card and add text
    const card = document.createElement('article');
    card.classList.add('card');
    const cardTitle = document.createElement('p');
    cardTitle.innerText = myLibrary[latestBook].info();

    // Create a div to contain buttons
    const cardBtns = document.createElement('div');
    cardBtns.classList.add('cardBtns');

    // Create a 'remove' button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    // Use an image to style the button
    const removeSVG = document.createElement('img');
    removeSVG.src = "./images/remove.svg";
    removeBtn.appendChild(removeSVG);
    // When 'remove' is clicked, delete the Book object and remove it from DOM
    removeBtn.addEventListener('click', () => {
        removeBookFromLibrary(card.id);
        card.remove();
    })

    // Create a 'read' state button that toggles the 'read' state
    const readBtn = document.createElement('button');
    readBtn.classList.add('readBtn');
    const readSVG = document.createElement('img');
    const readState = myLibrary[latestBook].read;
    if (readState === true) {
        readSVG.src = "images/book-check.svg";
    }
    else if (readState === false) {
        readSVG.src = "images/books-shelved.svg";
    }
    readBtn.appendChild(readSVG);

    readBtn.addEventListener('click', () => {
        let state;
        state = changeReadState(card.id);
        if (state === true) {
            readSVG.src = "images/book-check.svg";
        }
        else if (state === false) {
            readSVG.src = "images/books-shelved.svg";
        }
    })

    // cardTitle.insertAdjacentElement('beforebegin', readBtn);
    
    // Add the remove button to the buttons div
    cardBtns.appendChild(removeBtn);

    card.appendChild(cardBtns);
    card.appendChild(readBtn)
    card.appendChild(cardTitle);
    card.id = latestBook;
    library.appendChild(card);

}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(book1);

updateLibrary();


// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("add");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 





