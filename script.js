document.addEventListener("DOMContentLoaded", () => {
    const newBookButton = document.querySelector(".new");
    const popup = document.querySelector(".popup");
    const form = document.querySelector("#form");
    const table = document.getElementById("table");
    const tbody = document.querySelector("tbody");
    const main = document.querySelector("#main");

    let myLibrary = [];

    class Book {
        constructor(author, title, pageCount, finished) {
            this.author = author;
            this.title = title;
            this.pageCount = pageCount;
            this.finished = finished;
        }
    }

    // Add some default books to the library
    myLibrary.push(new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true));
    myLibrary.push(new Book("J.R.R. Tolkien", "The Hobbit", 310, false));
    myLibrary.push(new Book("George Orwell", "1984", 328, true));
    myLibrary.push(new Book("F. Scott Fitzgerald", "The Great Gatsby", 180, false));

    newBookButton.addEventListener("click", () => {
        popup.style.display = "flex";
        main.classList.add("opacity-change");
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pageCount = document.getElementById("pageCount").value;
        const finished = document.getElementById("yes").checked;

        const book = new Book(author, title, pageCount, finished);
        addBookToLibrary(book);

        form.reset();
        popup.style.display = "none";
        main.classList.remove("opacity-change");
    });

    function addBookToLibrary(book) {
        myLibrary.push(book);
        displayBooks();
    }

    function displayBooks() {
        tbody.innerHTML = ""; 
        myLibrary.forEach((book, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pageCount}</td>
                <td><button class="status" data-index="${index}" style="background-color: ${book.finished ? 'lightGreen' : 'lightPink'}">${book.finished ? 'Read' : 'Not Read'}</button></td>
                <td><button class="delete" data-index="${index}">Delete</button></td>
            `;
            tbody.appendChild(row);
        });

        addEventListeners();
    }

    function addEventListeners() {
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                myLibrary.splice(index, 1);
                displayBooks();
            });
        });

        const statusButtons = document.querySelectorAll(".status");
        statusButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                myLibrary[index].finished = !myLibrary[index].finished;
                displayBooks();
            });
        });
    }

    // Display the initial books when the page loads
    displayBooks();
});