
import { Book} from './iBooks';
import { LibraryInterface } from './iLibraryInterface';

export class Library implements LibraryInterface {
  public books: Book[];
  public checkedOutBooks: Book[];
  public maxCheckoutLimit: number;

  constructor() {
    this.books = [];
    this.checkedOutBooks = [];
    this.maxCheckoutLimit = 3;
  }

  public addBook(title: string, author: string): void {
    const book: Book = { title, author, checkedOut: false };
    this.books.push(book);
    console.log(`${title} by ${author} added to the library.`);
  }

  public listAvailableBooks(): void {
    console.log("Available Books:");
    this.books.forEach((book, index) => {
      if (!book.checkedOut) {
        console.log(`${index + 1}. ${book.title} by ${book.author}`);
      }
    });
  }

  public searchBooks(query: string): void {
    console.log("Search Results:");
    const results = this.books
      .filter((book) =>
        book.title.toLowerCase() === query.toLowerCase()
      );
  
    results.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author}`);
    });
  }
  
  

  public issueBook(index: number): void {
    if (index < 1 || index > this.books.length) {
      console.log("Invalid book index.");
      return;
    }

    const selectedBook = this.books[index - 1];
    this.issueBookCheck(selectedBook);

  }

  public issueBookCheck(selectedBook: Book): void  {
  if (selectedBook.checkedOut) {
  console.log("This book is already checked out.");
  return;
}

if (this.checkedOutBooks.length >= this.maxCheckoutLimit) {
  console.log("You have reached the maximum checkout limit. Return some books to check out more.");
  return;
}

selectedBook.checkedOut = true;
this.checkedOutBooks.push(selectedBook);
console.log(`${selectedBook.title} by ${selectedBook.author} checked out successfully.`);
}

    

  public returnBook(index: number): void {
    if (index < 1 || index > this.checkedOutBooks.length) {
      console.log("Invalid book index.");
      return;
    }

    const returnedBook = this.checkedOutBooks[index - 1];
    returnedBook.checkedOut = false;
    this.checkedOutBooks.splice(index - 1, 1);
    console.log(`${returnedBook.title} by ${returnedBook.author} returned successfully.`);
  }

  public removeBook(index: number): void {
    if (index < 1 || index > this.books.length) {
      console.log("Invalid book index.");
      return;
    }

    const removedBook = this.books.splice(index - 1, 1)[0];

    const checkedOutIndex = this.checkedOutBooks.indexOf(removedBook);
    if (checkedOutIndex !== -1) {
      this.checkedOutBooks.splice(checkedOutIndex, 1);
    }

    console.log(`${removedBook.title} by ${removedBook.author} removed from the library.`);
  }
}
