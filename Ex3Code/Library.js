"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
        this.checkedOutBooks = [];
        this.maxCheckoutLimit = 3;
    }
    Library.prototype.addBook = function (title, author) {
        var book = { title: title, author: author, checkedOut: false };
        this.books.push(book);
        console.log("".concat(title, " by ").concat(author, " added to the library."));
    };
    Library.prototype.listAvailableBooks = function () {
        console.log("Available Books:");
        this.books.forEach(function (book, index) {
            if (!book.checkedOut) {
                console.log("".concat(index + 1, ". ").concat(book.title, " by ").concat(book.author));
            }
        });
    };
    Library.prototype.searchBooks = function (query) {
        console.log("Search Results:");
        var results = this.books.filter(function (book) {
            return book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase());
        });
        results.forEach(function (book, index) {
            console.log("".concat(index + 1, ". ").concat(book.title, " by ").concat(book.author));
        });
    };
    Library.prototype.issueBook = function (index) {
        if (index < 1 || index > this.books.length) {
            console.log("Invalid book index.");
            return;
        }
        var selectedBook = this.books[index - 1];
        this.issueBookCheck(selectedBook);
    };
    Library.prototype.issueBookCheck = function (selectedBook) {
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
        console.log("".concat(selectedBook.title, " by ").concat(selectedBook.author, " checked out successfully."));
    };
    Library.prototype.returnBook = function (index) {
        if (index < 1 || index > this.checkedOutBooks.length) {
            console.log("Invalid book index.");
            return;
        }
        var returnedBook = this.checkedOutBooks[index - 1];
        returnedBook.checkedOut = false;
        this.checkedOutBooks.splice(index - 1, 1);
        console.log("".concat(returnedBook.title, " by ").concat(returnedBook.author, " returned successfully."));
    };
    Library.prototype.removeBook = function (index) {
        if (index < 1 || index > this.books.length) {
            console.log("Invalid book index.");
            return;
        }
        var removedBook = this.books.splice(index - 1, 1)[0];
        var checkedOutIndex = this.checkedOutBooks.indexOf(removedBook);
        if (checkedOutIndex !== -1) {
            this.checkedOutBooks.splice(checkedOutIndex, 1);
        }
        console.log("".concat(removedBook.title, " by ").concat(removedBook.author, " removed from the library."));
    };
    return Library;
}());
exports.Library = Library;
