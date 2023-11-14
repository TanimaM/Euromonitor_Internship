"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
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
        // Remove the book from the checkedOutBooks list if it's checked out
        var checkedOutIndex = this.checkedOutBooks.indexOf(removedBook);
        if (checkedOutIndex !== -1) {
            this.checkedOutBooks.splice(checkedOutIndex, 1);
        }
        console.log("".concat(removedBook.title, " by ").concat(removedBook.author, " removed from the library."));
    };
    return Library;
}());
var library = new Library();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function prompt(question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var option, _a, title, author, query, issueIndex, _b, returnIndex, _c, removeIndex, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!true) return [3 /*break*/, 17];
                console.log("\nEnter your option:\nWelcome to the Library\n1. Add Books to the library\n2. List all available books in the library\n3. Search for books by title or author\n4. Issue Book\n5. Return Book\n6. Remove books from the library\n7. Exit from library");
                return [4 /*yield*/, prompt("Select an option (1-7): ")];
            case 1:
                option = _e.sent();
                _a = parseInt(option);
                switch (_a) {
                    case 1: return [3 /*break*/, 2];
                    case 2: return [3 /*break*/, 5];
                    case 3: return [3 /*break*/, 6];
                    case 4: return [3 /*break*/, 8];
                    case 5: return [3 /*break*/, 10];
                    case 6: return [3 /*break*/, 12];
                    case 7: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 15];
            case 2: return [4 /*yield*/, prompt("Enter the title of the book: ")];
            case 3:
                title = _e.sent();
                return [4 /*yield*/, prompt("Enter the author of the book: ")];
            case 4:
                author = _e.sent();
                library.addBook(title, author);
                return [3 /*break*/, 16];
            case 5:
                library.listAvailableBooks();
                return [3 /*break*/, 16];
            case 6: return [4 /*yield*/, prompt("Enter the title or author to search: ")];
            case 7:
                query = _e.sent();
                library.searchBooks(query);
                return [3 /*break*/, 16];
            case 8:
                _b = parseInt;
                return [4 /*yield*/, prompt("Enter the index of the book to issue: ")];
            case 9:
                issueIndex = _b.apply(void 0, [_e.sent()]);
                library.issueBook(issueIndex);
                return [3 /*break*/, 16];
            case 10:
                _c = parseInt;
                return [4 /*yield*/, prompt("Enter the index of the book to return: ")];
            case 11:
                returnIndex = _c.apply(void 0, [_e.sent()]);
                library.returnBook(returnIndex);
                return [3 /*break*/, 16];
            case 12:
                _d = parseInt;
                return [4 /*yield*/, prompt("Enter the index of the book to remove: ")];
            case 13:
                removeIndex = _d.apply(void 0, [_e.sent()]);
                library.removeBook(removeIndex);
                return [3 /*break*/, 16];
            case 14:
                console.log("Exiting from the library. Goodbye!");
                rl.close();
                process.exit(0);
                _e.label = 15;
            case 15:
                console.log("Invalid option. Please enter a number between 1 and 7.");
                _e.label = 16;
            case 16: return [3 /*break*/, 0];
            case 17: return [2 /*return*/];
        }
    });
}); })();
