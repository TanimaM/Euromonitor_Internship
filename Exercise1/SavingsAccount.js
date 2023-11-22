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
exports.SavingsAccount = void 0;
var BankAccount_1 = require("./BankAccount");
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount(customerName, age, location, state, country, email, initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        return _super.call(this, customerName, age, location, state, country, email, initialBalance) || this;
    }
    SavingsAccount.prototype.withdraw = function (amount) {
        if (this.balance - amount < 500) {
            console.log('You cannot withdraw the amount due to insufficient balance.');
        }
        else {
            this.balance -= amount;
        }
    };
    SavingsAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    return SavingsAccount;
}(BankAccount_1.BankAccount));
exports.SavingsAccount = SavingsAccount;
