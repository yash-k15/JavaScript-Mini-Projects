class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
   
    addBook(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class='delete-item'>X</td>`;

        list.appendChild(row);
    }

    removeBook(target) {
        target.remove();
    }

    showMessage(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const parent = document.querySelector('.container');
        const form = document.getElementById('book-form');
        //console.log('error');
        parent.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books =[];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        const ui = new UI();

        books.forEach(function(book) {
            ui.addBook(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        //console.log(isbn);
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.getElementById('book-form').addEventListener('submit', function(e){
    const name = document.getElementById('title').value;
    const auth = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(name, auth, isbn);
    const ui = new UI();

    if(name === '' || auth === '' || isbn === '') {
        ui.showMessage('Please fill all the fields', 'error');
    } else {
        
        ui.addBook(book);
        Store.addBook(book);
        ui.clearFields();
        ui.showMessage('Book added successfully', 'success');
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    if(e.target.className === 'delete-item') {
        ui.removeBook(e.target.parentElement.parentElement);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showMessage('Book deleted!', 'success');
    }

    e.preventDefault();
});