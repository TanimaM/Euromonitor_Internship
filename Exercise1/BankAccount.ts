import * as readlineSync from 'readline-sync';
import { AccountDetails } from './interface';
import { SavingsAccount } from './SavingsAccount';

export abstract class BankAccount {
  public accountNumber: string;
  protected customerName: string;
  protected age: number;
  protected location: string;
  protected state: string;
  protected country: string;
  protected email: string;
  public balance: number;

  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    initialBalance: number = 0
  ) {
    this.accountNumber = this.generateAccountNumber();
    this.customerName = customerName;
    this.age = age;
    this.location = location;
    this.state = state;
    this.country = country;
    if (this.validateEmail(email)) {
      this.email = email;
    } else {
      throw new Error('Invalid email pattern');
    }
    this.balance = initialBalance;
  }

  generateAccountNumber(): string {
    const accountTypePrefix = this.constructor === SavingsAccount ? 'Sav' : 'Cur';
    return `${accountTypePrefix}${Math.floor(100000 + Math.random() * 900000)}`;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  abstract withdraw(amount: number): void;
  abstract deposit(amount: number): void;

  getAccountDetails(): AccountDetails {
    return {
      customerName: this.customerName,
      email: this.email,
      accountType: this.constructor.name,
      totalBalance: this.balance,
    };
  }

}
