import * as readline from 'readline';

interface Book {
  title: string;
  author: string;
  checkedOut: boolean;
}

class Library {
  private books: Book[];
  private checkedOutBooks: Book[];
  private maxCheckoutLimit: number;

  constructor() {
    this.books = [];
    this.checkedOutBooks = [];
    this.maxCheckoutLimit = 3;
  }

  addBook(title: string, author: string): void {
    const book: Book = { title, author, checkedOut: false };
    this.books.push(book);
    console.log(`${title} by ${author} added to the library.`);
  }

  listAvailableBooks(): void {
    console.log("Available Books:");
    this.books.forEach((book, index) => {
      if (!book.checkedOut) {
        console.log(`${index + 1}. ${book.title} by ${book.author}`);
      }
    });
  }

  searchBooks(query: string): void {
    console.log("Search Results:");
    const results = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

    results.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author}`);
    });
  }

  issueBook(index: number): void {
    if (index < 1 || index > this.books.length) {
      console.log("Invalid book index.");
      return;
    }

    const selectedBook = this.books[index - 1];

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

  returnBook(index: number): void {
    if (index < 1 || index > this.checkedOutBooks.length) {
      console.log("Invalid book index.");
      return;
    }

    const returnedBook = this.checkedOutBooks[index - 1];
    returnedBook.checkedOut = false;
    this.checkedOutBooks.splice(index - 1, 1);
    console.log(`${returnedBook.title} by ${returnedBook.author} returned successfully.`);
  }

  removeBook(index: number): void {
    if (index < 1 || index > this.books.length) {
      console.log("Invalid book index.");
      return;
    }

    const removedBook = this.books.splice(index - 1, 1)[0];

    // Remove the book from the checkedOutBooks list if it's checked out
    const checkedOutIndex = this.checkedOutBooks.indexOf(removedBook);
    if (checkedOutIndex !== -1) {
      this.checkedOutBooks.splice(checkedOutIndex, 1);
    }

    console.log(`${removedBook.title} by ${removedBook.author} removed from the library.`);
  }
}

const library = new Library();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

(async () => {
  while (true) {
    console.log(`
Enter your option:
Welcome to the Library
1. Add Books to the library
2. List all available books in the library
3. Search for books by title or author
4. Issue Book
5. Return Book
6. Remove books from the library
7. Exit from library`);

    const option = await prompt("Select an option (1-7): ");

    switch (parseInt(option)) {
      case 1:
        const title = await prompt("Enter the title of the book: ");
        const author = await prompt("Enter the author of the book: ");
        library.addBook(title, author);
        break;
      case 2:
        library.listAvailableBooks();
        break;
      case 3:
        const query = await prompt("Enter the title or author to search: ");
        library.searchBooks(query);
        break;
      case 4:
        const issueIndex = parseInt(await prompt("Enter the index of the book to issue: "));
        library.issueBook(issueIndex);
        break;
      case 5:
        const returnIndex = parseInt(await prompt("Enter the index of the book to return: "));
        library.returnBook(returnIndex);
        break;
      case 6:
        const removeIndex = parseInt(await prompt("Enter the index of the book to remove: "));
        library.removeBook(removeIndex);
        break;
      case 7:
        console.log("Exiting from the library. Goodbye!");
        rl.close();
        process.exit(0);
      default:
        console.log("Invalid option. Please enter a number between 1 and 7.");
    }
  }
})();
