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
// Main.ts
var readline = require("readline");
var Library_1 = require("./Library");
var library = new Library_1.Library();
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
function displayMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var option;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\n    Enter your option:\n    Welcome to the Library\n    1. Add Books to the library\n    2. List all available books in the library\n    3. Search for books by title\n    4. Issue Book\n    5. Return Book\n    6. Remove books from the library\n    7. Exit from library");
                    return [4 /*yield*/, prompt("Select an option (1-7): ")];
                case 1:
                    option = _a.sent();
                    return [2 /*return*/, parseInt(option)];
            }
        });
    });
}
function handleOption(option) {
    return __awaiter(this, void 0, void 0, function () {
        var optionActions, selectedAction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    optionActions = {
                        1: addBooks,
                        2: function () { return library.listAvailableBooks(); },
                        3: searchBooks,
                        4: issueBook,
                        5: returnBook,
                        6: removeBook,
                        7: function () {
                            console.log("Exiting from the library. Goodbye!");
                            rl.close();
                            process.exit(0);
                        },
                    };
                    selectedAction = optionActions[option];
                    if (!selectedAction) return [3 /*break*/, 2];
                    return [4 /*yield*/, selectedAction()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    console.log("Invalid option. Please enter a number between 1 and 7.");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var title, author;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt("Enter the title of the book: ")];
                case 1:
                    title = _a.sent();
                    return [4 /*yield*/, prompt("Enter the author of the book: ")];
                case 2:
                    author = _a.sent();
                    library.addBook(title, author);
                    return [2 /*return*/];
            }
        });
    });
}
function searchBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt("Enter the title to search: ")];
                case 1:
                    query = _a.sent();
                    library.searchBooks(query);
                    return [2 /*return*/];
            }
        });
    });
}
function issueBook() {
    return __awaiter(this, void 0, void 0, function () {
        var issueIndex, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, prompt("Enter the index of the book to issue: ")];
                case 1:
                    issueIndex = _a.apply(void 0, [_b.sent()]);
                    library.issueBook(issueIndex);
                    return [2 /*return*/];
            }
        });
    });
}
function returnBook() {
    return __awaiter(this, void 0, void 0, function () {
        var returnIndex, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, prompt("Enter the index of the book to return: ")];
                case 1:
                    returnIndex = _a.apply(void 0, [_b.sent()]);
                    library.returnBook(returnIndex);
                    return [2 /*return*/];
            }
        });
    });
}
function removeBook() {
    return __awaiter(this, void 0, void 0, function () {
        var removeIndex, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, prompt("Enter the index of the book to remove: ")];
                case 1:
                    removeIndex = _a.apply(void 0, [_b.sent()]);
                    library.removeBook(removeIndex);
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var option;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, displayMenu()];
            case 1:
                option = _a.sent();
                return [4 /*yield*/, handleOption(option)];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); })();
