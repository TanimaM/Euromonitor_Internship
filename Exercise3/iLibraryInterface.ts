export interface LibraryInterface {
    addBook(title: string, author: string): void;
    listAvailableBooks(): void;
    searchBooks(query: string): void;
    issueBook(index: number): void;
    returnBook(index: number): void;
    removeBook(index: number): void;
  }