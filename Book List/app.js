function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBook = function(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class='delete-item'>X</td>`;

    list.appendChild(row);
}

UI.prototype.removeBook = function(target) {
    target.remove();
}

UI.prototype.showMessage = function(message, className) {
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
};

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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
        ui.clearFields();
        ui.showMessage('Book added successfully', 'success');
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    if(e.target.className === 'delete-item') {
        ui.removeBook(e.target.parentElement.parentElement);
        ui.showMessage('Book deleted!', 'success');
    }

    e.preventDefault();
});