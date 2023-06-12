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
    updateLibrary();
})

function removeBookFromLibrary(index) {
    // Remove 1 element at 'index' position
    myLibrary.splice(index, 1);
}

function changeReadState(index) {
    const state = myLibrary[index].read;
    if (state === true) {
        myLibrary[index].read = false;
        console.log(`${myLibrary[index].read}`);
    }
    else {
        myLibrary[index].read = true;
        console.log(`${myLibrary[index].read}`);
    }

    return myLibrary[index].read;
}


function updateLibrary() {
    const library = document.getElementById('library');
    const latestBook = myLibrary.length - 1;

    const card = document.createElement('article');
    card.classList.add('card');
    const cardTitle = document.createElement('p');
    cardTitle.innerText = myLibrary[latestBook].info();

    const cardBtns = document.createElement('div');
    cardBtns.classList.add('cardBtns');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    const removeSVG = document.createElement('img');
    removeSVG.src = "./images/remove.svg";
    removeBtn.appendChild(removeSVG);

    removeBtn.addEventListener('click', () => {
        removeBookFromLibrary(card.id);
        card.remove();
    })

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

    cardBtns.appendChild(readBtn);
    cardBtns.appendChild(removeBtn);

    card.appendChild(cardBtns);
    card.appendChild(cardTitle);
    card.id = latestBook;
    library.appendChild(card);

}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(book1);

updateLibrary();






