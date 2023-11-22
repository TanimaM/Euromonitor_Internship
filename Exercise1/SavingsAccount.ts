
import { BankAccount } from './BankAccount';

export class SavingsAccount extends BankAccount {
  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    initialBalance: number = 0
  ) {
    super(customerName, age, location, state, country, email, initialBalance);
  }

  public withdraw(amount: number): void {
    if (this.balance - amount < 500) {
      console.log('You cannot withdraw the amount due to insufficient balance.');
    } else {
      this.balance -= amount;
    }
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }
}
