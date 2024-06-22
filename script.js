const myLibrary = [];

document.querySelector("#btn-add").addEventListener("click", () => {
    document.querySelector(".popup").showModal();
});

document.querySelector("#btn-close").addEventListener("click", () => {
    document.querySelector(".popup").close();
});

document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
    document.querySelector(".popup").close();
});

function addBookToLibrary() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    const newBook = { title, author, pages, read };
    myLibrary.push(newBook);
    displayBook(newBook);
    document.querySelector("#form").reset();
}

function displayBook(book) {
    const container = document.querySelector(".container");

    const bookDiv = createBookElement(book);

    container.appendChild(bookDiv);
}

function createBookElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const readClass = book.read === "Yes" ? "read-yes" : "read-no";

    bookDiv.innerHTML = `
        <div class="book-title">
            <p class="title">Title: ${book.title}</p>
        </div>
        <div class="book-content">
            <div class="author">Author: ${book.author}</div>
            <div class="pages">Pages: ${book.pages}</div>
        </div>
        <button class="read ${readClass}">Read? ${book.read}</button>
        <button class="book-del">Delete</button>
    `;

    const readButton = bookDiv.querySelector(".read");
    readButton.addEventListener("click", () => toggleReadStatus(book, readButton));

    const deleteButton = bookDiv.querySelector(".book-del");
    deleteButton.addEventListener("click", () => deleteBook(book, bookDiv));

    return bookDiv;
}

function toggleReadStatus(book, button) {
    if (book.read === "Yes") {
        book.read = "No";
        button.textContent = "Read? No";
        button.classList.remove("read-yes");
        button.classList.add("read-no");
    } else {
        book.read = "Yes";
        button.textContent = "Read? Yes";
        button.classList.remove("read-no");
        button.classList.add("read-yes");
    }
}

function deleteBook(book, bookDiv) {
    const container = document.querySelector(".container");
    container.removeChild(bookDiv);
    myLibrary.splice(myLibrary.indexOf(book), 1);
}
