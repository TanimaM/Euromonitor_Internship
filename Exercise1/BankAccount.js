"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
var SavingsAccount_1 = require("./SavingsAccount");
var BankAccount = /** @class */ (function () {
    function BankAccount(customerName, age, location, state, country, email, initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        this.accountNumber = this.generateAccountNumber();
        this.customerName = customerName;
        this.age = age;
        this.location = location;
        this.state = state;
        this.country = country;
        if (this.validateEmail(email)) {
            this.email = email;
        }
        else {
            throw new Error('Invalid email pattern');
        }
        this.balance = initialBalance;
    }
    BankAccount.prototype.generateAccountNumber = function () {
        var accountTypePrefix = this.constructor === SavingsAccount_1.SavingsAccount ? 'Sav' : 'Cur';
        return "".concat(accountTypePrefix).concat(Math.floor(100000 + Math.random() * 900000));
    };
    BankAccount.prototype.validateEmail = function (email) {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    BankAccount.prototype.getAccountDetails = function () {
        return {
            customerName: this.customerName,
            email: this.email,
            accountType: this.constructor.name,
            totalBalance: this.balance,
        };
    };
    return BankAccount;
}());
exports.BankAccount = BankAccount;
