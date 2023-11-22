// CurrentAccount.ts
import { BankAccount } from './BankAccount';

export class CurrentAccount extends BankAccount {
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

  withdraw(amount: number): void {
    const overdraftLimit = 800;
    if (amount > this.balance - overdraftLimit) {
      console.log('Balance is less, Use Overdraft');
    } else {
      this.balance -= amount;
    }
  }

  deposit(amount: number): void {
    this.balance += amount;
  }
}
