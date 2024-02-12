//library array to store the books
let library = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];


//constructor function for book object
function Book(id, title, author, isBorrowed){
    this.id = id;
    this.title = title;
    this.author = author;
    this.isBorrowed = false;
};

const changeBorrowStatus = (bookId) => {
    const idx = library.findIndex(book => book.id === bookId);
        if(bookId !== -1){
            library[idx].isBorrowed = !library[idx].isBorrowed;
            displayBooks(library, 'list');
        }
    }

const displayBooks = (books, tagId) =>{
    const bookList = document.getElementById(tagId);
    bookList.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = "bookss";
        const item = document.createElement('ol');    
        const li1 = document.createElement('li');
        li1.textContent = `Book Id: ${book.id}`;
        const li2 = document.createElement('li');
        li2.textContent = `Book Title: ${book.title}`;
        const li3 = document.createElement('li');
        li3.textContent = `Book's Author: ${book.author}`;
        item.appendChild(li1);
        item.appendChild(li2);
        item.appendChild(li3);
        
        if(book.isBorrowed){
            const li4 = document.createElement('li');
            li4.className = "li4r";
            li4.textContent = 'Status : Borrowed';
            const returnButton = document.createElement('button');
            returnButton.textContent = 'Return';
            returnButton.onclick = () => (changeBorrowStatus(book.id), alert("Book Returned Successfully..!!"));
            li4.appendChild(returnButton);
            item.appendChild(li4);
        }
        else{
            const li4 = document.createElement('li');
            li4.className = "li4b";
            li4.textContent = 'Status : Not Borrowed';
            const borrowButton = document.createElement('button');
            borrowButton.textContent = 'Borrow';
            borrowButton.onclick = () => (changeBorrowStatus(book.id), alert("Book Borrowed Successfully..!!"));
            li4.appendChild(borrowButton);
            item.appendChild(li4);
        }
        li.appendChild(item)
        bookList.appendChild(li);
    });
}

const addBook = (id, title, author) =>{
    const newbook = new Book(id, title, author);
    library.push(newbook);
    localStorage.setItem('items', JSON.stringify(library));
}

const captureData = () =>{
    // library = JSON.parse(localStorage.getItem('library'));
    const id = document.getElementById('id').value.trim();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();

    if(!id || !title || !author){
        alert("All fields are neccessary");
        return;
    }
    if(library.find(book => book.id === id)){
        alert("A Book with the same id already exist..!!");
        return;
    }
    addBook(id, title, author);
    alert("New Book Added Successfully..!!!")
    displayBooks(library, 'list');
}

const x = document.getElementById('btn-1');
x.addEventListener('click', captureData);

const searchBook = () =>{
    const title = document.getElementById('search-item').value.trim();
    if(!title){
        alert("Please enter the title of the book..!!");
        return;
    }
    const books = [];
    library.forEach(book =>{
        if(book.title.toLowerCase() === title.toLowerCase()){
            books.push(book);
        }
    })
    displayBooks(books, 'foundbooks');
    if(books.length === 0){
        alert("No matching books found.");
        return;
    }else{
        alert("Book found")
    }

}

const searchButton = document.getElementById('btn-2');
searchButton.addEventListener('click', searchBook);
