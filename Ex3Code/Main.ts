// Main.ts
import * as readline from 'readline';
import { Library } from './Library';

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

async function displayMenu(): Promise<number> {
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
  return parseInt(option);
}

async function handleOption(option: number): Promise<void> {
  if (option === 1) {
    await addBooks();
  } else if (option === 2) {
    library.listAvailableBooks();
  } else if (option === 3) {
    await searchBooks();
  } else if (option === 4) {
    await issueBook();
  } else if (option === 5) {
    await returnBook();
  } else if (option === 6) {
    await removeBook();
  } else if (option === 7) {
    console.log("Exiting from the library. Goodbye!");
    rl.close();
    process.exit(0);
  } else {
    console.log("Invalid option. Please enter a number between 1 and 7.");
  }
}

async function addBooks(): Promise<void> {
  const title = await prompt("Enter the title of the book: ");
  const author = await prompt("Enter the author of the book: ");
  library.addBook(title, author);
}

async function searchBooks(): Promise<void> {
  const query = await prompt("Enter the title or author to search: ");
  library.searchBooks(query);
}

async function issueBook(): Promise<void> {
  const issueIndex = parseInt(await prompt("Enter the index of the book to issue: "));
  library.issueBook(issueIndex);
}

async function returnBook(): Promise<void> {
  const returnIndex = parseInt(await prompt("Enter the index of the book to return: "));
  library.returnBook(returnIndex);
}

async function removeBook(): Promise<void> {
  const removeIndex = parseInt(await prompt("Enter the index of the book to remove: "));
  library.removeBook(removeIndex);
}

(async () => {
  while (true) {
    const option = await displayMenu();
    await handleOption(option);
  }
})();
