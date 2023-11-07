"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
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
        var accountTypePrefix = this.constructor === SavingsAccount ? 'Sav' : 'Curr';
        return "".concat(accountTypePrefix).concat(Math.floor(100000 + Math.random() * 900000));
    };
    BankAccount.prototype.validateEmail = function (email) {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            console.log('You cannot withdraw the amount due to insufficient balance.');
        }
    };
    BankAccount.prototype.getAccountDetails = function () {
        return "Customer Name: ".concat(this.customerName, "\nEmail ID: ").concat(this.email, "\nType of Account: ").concat(this.constructor.name, "\nTotal Balance: ").concat(this.balance);
    };
    return BankAccount;
}());
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount(customerName, age, location, state, country, email, initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        return _super.call(this, customerName, age, location, state, country, email, initialBalance) || this;
    }
    SavingsAccount.prototype.deposit = function (amount) {
        if (amount >= 500) {
            _super.prototype.deposit.call(this, amount);
        }
        else {
            console.log('Minimum deposit for Savings Account is 500.');
        }
    };
    return SavingsAccount;
}(BankAccount));
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(customerName, age, location, state, country, email, initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        return _super.call(this, customerName, age, location, state, country, email, initialBalance) || this;
    }
    CurrentAccount.prototype.deposit = function (amount) {
        if (amount >= 800) {
            _super.prototype.deposit.call(this, amount);
        }
        else {
            console.log('Minimum deposit for Current Account is 800.');
        }
    };
    CurrentAccount.prototype.withdraw = function (amount) {
        if (amount > this.balance) {
            console.log('Balance is less, Use Overdraft');
        }
        else {
            _super.prototype.withdraw.call(this, amount);
        }
    };
    return CurrentAccount;
}(BankAccount));
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Welcome to Our Bank Application');
function displayMenu() {
    console.log("\nEnter your option:\n1. Open Savings or Current Account\n2. View Balance\n3. View Customer Data\n4. Withdraw Money\n5. Deposit Money\n6. Exit from Application\n  ");
}
function createNewAccount() {
    var ageTries = 0;
    var attemptToCreateAccount = function () {
        rl.question('Select Account Type (Savings/Current): ', function (accountType) {
            if (accountType === 'Savings' || accountType === 'Current') {
                rl.question('Customer Name: ', function (customerName) {
                    var promptAge = function () {
                        rl.question('Age: ', function (age) {
                            if (parseInt(age) > 68) {
                                ageTries++;
                                if (ageTries < 2) {
                                    console.log('You are not eligible for account opening.');
                                    promptAge();
                                }
                                else {
                                    console.log('Limit reached for entering age. Exiting account creation.');
                                    displayMenu();
                                    processInput();
                                }
                            }
                            else {
                                rl.question('Location: ', function (location) {
                                    rl.question('State: ', function (state) {
                                        rl.question('Country: ', function (country) {
                                            rl.question('Email ID: ', function (email) {
                                                rl.question('Initial Balance: ', function (initialBalance) {
                                                    try {
                                                        var account = accountType === 'Savings'
                                                            ? new SavingsAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance))
                                                            : new CurrentAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance));
                                                        accounts.push(account);
                                                        console.log("Account Created! Your Account Number is: ".concat(account.accountNumber));
                                                        displayMenu();
                                                        processInput();
                                                    }
                                                    catch (error) {
                                                        console.log(error.message);
                                                        displayMenu();
                                                        processInput();
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            }
                        });
                    };
                    promptAge();
                });
            }
            else {
                console.log('Invalid account type. Please choose Savings or Current.');
                displayMenu();
                processInput();
            }
        });
    };
    attemptToCreateAccount();
}
var accounts = [];
function viewBalance() {
    rl.question('Enter Account Number to check balance: ', function (accountNumber) {
        var account = accounts.find(function (acc) { return acc.accountNumber === accountNumber; });
        if (account) {
            console.log("Balance for ".concat(accountNumber, ": ").concat(account.balance));
        }
        else {
            console.log('Account not found.');
        }
        displayMenu();
        processInput();
    });
}
function viewCustomerData() {
    rl.question('Enter Account Number to display details: ', function (accountNumber) {
        var account = accounts.find(function (acc) { return acc.accountNumber === accountNumber; });
        if (account) {
            console.log(account.getAccountDetails());
        }
        else {
            console.log('Account not found.');
        }
        displayMenu();
        processInput();
    });
}
function withdrawMoney() {
    rl.question('Enter Account Number to withdraw from: ', function (accountNumber) {
        var account = accounts.find(function (acc) { return acc.accountNumber === accountNumber; });
        if (account) {
            rl.question('Enter the amount to withdraw: ', function (amount) {
                account.withdraw(parseFloat(amount));
                console.log("Withdrawal successful. Current balance: ".concat(account.balance));
                displayMenu();
                processInput();
            });
        }
        else {
            console.log('Account not found.');
            displayMenu();
            processInput();
        }
    });
}
function depositMoney() {
    rl.question('Enter Account Number to deposit to: ', function (accountNumber) {
        var account = accounts.find(function (acc) { return acc.accountNumber === accountNumber; });
        if (account) {
            rl.question('Enter the amount to deposit: ', function (amount) {
                account.deposit(parseFloat(amount));
                console.log("Deposit successful. Current balance: ".concat(account.balance));
                displayMenu();
                processInput();
            });
        }
        else {
            console.log('Account not found.');
            displayMenu();
            processInput();
        }
    });
}
function processInput() {
    rl.question('Enter your option: ', function (option) {
        switch (option) {
            case '1':
                createNewAccount();
                break;
            case '2':
                viewBalance();
                break;
            case '3':
                viewCustomerData();
                break;
            case '4':
                withdrawMoney();
                break;
            case '5':
                depositMoney();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please choose a valid option.');
                displayMenu();
                processInput();
                break;
        }
    });
}
displayMenu();
processInput();

