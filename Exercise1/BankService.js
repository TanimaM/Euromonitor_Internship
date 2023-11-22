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
var readlineSync = require("readline-sync");
var SavingsAccount_1 = require("./SavingsAccount");
var CurrentAccount_1 = require("./CurrentAccount");
var BankApplication = /** @class */ (function () {
    function BankApplication() {
        this.accounts = [];
    }
    BankApplication.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Welcome to Our Bank Application');
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processInput()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BankApplication.prototype.createNewAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ageTries, accountType, customerName, ageResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ageTries = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 5];
                        accountType = this.promptAccountType();
                        if (!(accountType === 'savings' || accountType === 'current')) return [3 /*break*/, 3];
                        customerName = this.prompt('Customer Name: ');
                        return [4 /*yield*/, this.promptAge(customerName, ageTries, accountType)];
                    case 2:
                        ageResult = _a.sent();
                        if (ageResult === 'complete') {
                            return [3 /*break*/, 5]; // Break the loop when age validation is complete
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        console.log('Invalid account type. Please choose Savings or Current.');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BankApplication.prototype.promptAccountType = function () {
        return this.prompt('Select Account Type (Savings/Current): ').toLowerCase();
    };
    BankApplication.prototype.promptAge = function (customerName, ageTries, accountType) {
        return __awaiter(this, void 0, void 0, function () {
            var age;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        age = this.prompt('Age: ');
                        if (!(parseInt(age) > 68)) return [3 /*break*/, 4];
                        ageTries++;
                        if (!(ageTries < 2)) return [3 /*break*/, 2];
                        console.log('You are not eligible for account opening.');
                        return [4 /*yield*/, this.promptAge(customerName, ageTries, accountType)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        console.log('Limit reached for entering age. Exiting account creation.');
                        return [2 /*return*/, 'cancel'];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.completeAccountCreation(customerName, age, accountType);
                        return [2 /*return*/, 'complete'];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BankApplication.prototype.completeAccountCreation = function (customerName, age, accountType) {
        return __awaiter(this, void 0, void 0, function () {
            var location, state, country, email, initialBalance, minBalance, account, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        location = this.prompt('Location: ');
                        state = this.prompt('State: ');
                        country = this.prompt('Country: ');
                        email = this.prompt('Email ID: ');
                        initialBalance = this.prompt('Initial Balance: ');
                        minBalance = accountType === 'savings' ? 500 : 800;
                        if (!(parseFloat(initialBalance) < minBalance)) return [3 /*break*/, 2];
                        console.log("Initial balance should be at least ".concat(minBalance, " for ").concat(accountType, " account."));
                        return [4 /*yield*/, this.processInput()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        account = (accountType === 'savings')
                            ? new SavingsAccount_1.SavingsAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance))
                            : new CurrentAccount_1.CurrentAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance));
                        this.accounts.push(account);
                        console.log("Account Created! Your Account Number is: ".concat(account.accountNumber));
                        return [4 /*yield*/, this.processInput()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log('Error creating account:', error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BankApplication.prototype.prompt = function (question) {
        return readlineSync.question(question).trim();
    };
    BankApplication.prototype.viewBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountNumber, account;
            return __generator(this, function (_a) {
                accountNumber = this.prompt('Enter Account Number to check balance: ');
                account = this.accounts.find(function (acc) { return acc.accountNumber.toLowerCase() === accountNumber.toLowerCase(); });
                if (account) {
                    console.log("Balance for ".concat(accountNumber, ": ").concat(account.balance));
                }
                else {
                    console.log('Account not found.');
                }
                return [2 /*return*/];
            });
        });
    };
    BankApplication.prototype.viewCustomerData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountNumber, account, details;
            return __generator(this, function (_a) {
                accountNumber = this.prompt('Enter Account Number to display details: ');
                account = this.accounts.find(function (acc) { return acc.accountNumber.toLowerCase() === accountNumber.toLowerCase(); });
                if (account) {
                    details = account.getAccountDetails();
                    console.log("\n        Customer Name: ".concat(details.customerName, "\n        Email ID: ").concat(details.email, "\n        Type of Account: ").concat(details.accountType, "\n        Total Balance: ").concat(details.totalBalance, "\n      "));
                }
                else {
                    console.log('Account not found.');
                }
                return [2 /*return*/];
            });
        });
    };
    BankApplication.prototype.withdrawMoney = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountNumber, account, amount;
            return __generator(this, function (_a) {
                accountNumber = this.prompt('Enter Account Number to withdraw from: ');
                account = this.accounts.find(function (acc) { return acc.accountNumber.toLowerCase() === accountNumber.toLowerCase(); });
                if (account) {
                    amount = parseFloat(this.prompt('Enter the amount to withdraw: '));
                    account.withdraw(amount);
                    console.log("Current balance: ".concat(account.balance));
                }
                else {
                    console.log('Account not found.');
                }
                return [2 /*return*/];
            });
        });
    };
    BankApplication.prototype.depositMoney = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountNumber, account, amount;
            return __generator(this, function (_a) {
                accountNumber = this.prompt('Enter Account Number to deposit to: ');
                account = this.accounts.find(function (acc) { return acc.accountNumber.toLowerCase() === accountNumber.toLowerCase(); });
                if (account) {
                    amount = parseFloat(this.prompt('Enter the amount to deposit: '));
                    account.deposit(amount);
                    console.log("Current balance: ".concat(account.balance));
                }
                else {
                    console.log('Account not found.');
                }
                return [2 /*return*/];
            });
        });
    };
    BankApplication.prototype.processInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opt, option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\n      Enter your option:\n      1. Open Savings or Current Account\n      2. View Balance\n      3. View Customer Data\n      4. Withdraw Money\n      5. Deposit Money\n      6. Exit from Application\n    ");
                        opt = parseInt(this.prompt('Enter your option:'));
                        option = opt;
                        if (!(option === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createNewAccount()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(option === 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.viewBalance()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(option === 3)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.viewCustomerData()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 6:
                        if (!(option === 4)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.withdrawMoney()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(option === 5)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.depositMoney()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        if (option === 6) {
                            process.exit(0);
                        }
                        else {
                            console.log('Invalid option. Please choose a valid option.');
                        }
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return BankApplication;
}());
var bankApp = new BankApplication();
bankApp.start();
