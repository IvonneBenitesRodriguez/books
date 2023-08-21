class BookCollection{
    constructor(){
        this.books = [];// in case there is not data found in the functions, return an empty array
    }// this empty array [] appears inside the application tab

    getBooksFromStorage(){
        const storedBooks = localStorage.getItem('books');
        if(storedBooks){
            this.books = JSON.parse(storedBooks);
        }
    }

    saveBooksToStorage(){
        localStorage.setItem('books', JSON.stringify(this.books)); // in the localstorage appear the results
    }

    removeBookFromCollection(id){
        const index = this.books.findIndex((book) => book.id === id);
        if(index !== -1){
            this.books.splice(index, 1);
            this.saveBooksToStorage();
        }
    }

    displayBooks(){
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        
        this.getBooksFromStorage(); //Retrieve books from storage, the position of this command is important, it solved the issue.
        //it is good to place it before the iteration. this is very important to learn
        this.books.forEach((book)=>{
        const bookItem = document.createElement('tr'); // these are table rows
        const bookTitle = document.createElement('td'); //these are table cells
      const bookAuthor = document.createElement('td');
      const removeButton = document.createElement('button');

      bookTitle.textContent = `Title: ${book.title}`;
      bookAuthor.textContent = `Author: ${book.author}`;
      removeButton.textContent = 'Remove';

      removeButton.addEventListener('click', () => {
        this.removeBookFromCollection(book.id);
        this.displayBooks();
        });

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(removeButton);

        bookList.appendChild(bookItem);

    });
    

    }
}

//Book collection
const bookCollection = new BookCollection();
//Display books
bookCollection.displayBooks();