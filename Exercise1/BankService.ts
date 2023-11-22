import * as readlineSync from 'readline-sync';
import { BankAccount } from './BankAccount';
import { SavingsAccount } from './SavingsAccount';
import { CurrentAccount } from './CurrentAccount';

class BankApplication {
  public accounts: BankAccount[] = [];
  
  public async start(): Promise<void> {
    console.log('Welcome to Our Bank Application');
    while (true) {
      await this.processInput();
    }
  }

  public async createNewAccount(): Promise<void> {
    let ageTries = 0;
  
    while (true) {
      const accountType = this.promptAccountType();
  
      if (accountType === 'savings' || accountType === 'current') {
        const customerName = this.prompt('Customer Name: ');
        const ageResult = await this.promptAge(customerName, ageTries, accountType);
  
        if (ageResult === 'complete') {
          break; 
        }
      } else {
        console.log('Invalid account type. Please choose Savings or Current.');
      }
    }
  }
  
  public promptAccountType(): string {
    return this.prompt('Select Account Type (Savings/Current): ').toLowerCase();
  }
  
  public async promptAge(customerName: string, ageTries: number, accountType: string): Promise<string> {
    const ageInput = this.prompt('Age: ');
    const age = parseInt(ageInput);
  
    if (isNaN(age)) {
      this.displayInvalidAgeMessage();
      return await this.promptAge(customerName, ageTries, accountType);
    }
  
    if (age > 68) {
      return this.handleAgeGreaterThan68(customerName, ageTries, accountType);
    } else {
      this.completeAccountCreation(customerName, age.toString(), accountType);
      return 'complete';
    }
  }
  
  public displayInvalidAgeMessage(): void {
    console.log('Please enter a valid number less than 68 for age.');
  }
  
  public async handleAgeGreaterThan68(customerName: string, ageTries: number, accountType: string): Promise<string> {
    ageTries++;
  
    if (ageTries < 2) {
      console.log('Enter age less than 68.');
      return await this.promptAge(customerName, ageTries, accountType);
    } else {
      console.log('Limit reached for entering age. Exiting account creation.');
      return 'cancel';
    }
  }
  
  public async completeAccountCreation(customerName: string, age: string, accountType: string): Promise<void> {
    const location = this.prompt('Location: ');
    const state = this.prompt('State: ');
    const country = this.prompt('Country: ');
    const email = this.prompt('Email ID: ');
    const initialBalance = this.prompt('Initial Balance: ');
  
    const minBalance = accountType === 'savings' ? 500 : 800;
  
    if (parseFloat(initialBalance) < minBalance) {
      console.log(`Initial balance should be at least ${minBalance} for ${accountType} account.`);
      await this.processInput();
      return;
    }
  
    try {
      const account = (accountType === 'savings')
        ? new SavingsAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance))
        : new CurrentAccount(customerName, parseInt(age), location, state, country, email, parseFloat(initialBalance));
  
      this.accounts.push(account);
      console.log(`Account Created! Your Account Number is: ${account.accountNumber}`);
      await this.processInput();
    } catch (error) {
      console.log('Error creating account:', error.message);
    }
  }
  
  public prompt(question: string): string {
    return readlineSync.question(question).trim();
  }
  

  public async viewBalance(): Promise<void> {
    const accountNumber = this.prompt('Enter Account Number to check balance: ');
    const account = this.accounts.find((acc) => acc.accountNumber.toLowerCase() === accountNumber.toLowerCase());
    if (account) {
      console.log(`Balance for ${accountNumber}: ${account.balance}`);
    } else {
      console.log('Account not found.');
    }
  }

  public async viewCustomerData(): Promise<void> {
    const accountNumber = this.prompt('Enter Account Number to display details: ');
    const account = this.accounts.find((acc) => acc.accountNumber.toLowerCase() === accountNumber.toLowerCase());
    if (account) {
      const details = account.getAccountDetails();
      console.log(`
        Customer Name: ${details.customerName}
        Email ID: ${details.email}
        Type of Account: ${details.accountType}
        Total Balance: ${details.totalBalance}
      `);
    } else {
      console.log('Account not found.');
    }
  }

  public async withdrawMoney(): Promise<void> {
    const accountNumber = this.prompt('Enter Account Number to withdraw from: ');
    const account = this.accounts.find((acc) => acc.accountNumber.toLowerCase() === accountNumber.toLowerCase());
    if (account) {
      const amount = parseFloat(this.prompt('Enter the amount to withdraw: '));
      account.withdraw(amount);
      console.log(`Current balance: ${account.balance}`);
    } else {
      console.log('Account not found.');
    }
  }

  public async depositMoney(): Promise<void> {
    const accountNumber = this.prompt('Enter Account Number to deposit to: ');
    const account = this.accounts.find((acc) => acc.accountNumber.toLowerCase() === accountNumber.toLowerCase());
    if (account) {
      const amount = parseFloat(this.prompt('Enter the amount to deposit: '));
      account.deposit(amount);
      console.log(`Current balance: ${account.balance}`);
    } else {
      console.log('Account not found.');
    }
  }

  public async processInput(): Promise<void> {
    console.log(`
      Enter your option:
      1. Open Savings or Current Account
      2. View Balance
      3. View Customer Data
      4. Withdraw Money
      5. Deposit Money
      6. Exit from Application
    `);
    const opt = parseInt(this.prompt('Enter your option:'));
    const option = opt;

    if (option === 1) {
      await this.createNewAccount();
    } else if (option === 2) {
      await this.viewBalance();
    } else if (option === 3) {
      await this.viewCustomerData();
    } else if (option === 4) {
      await this.withdrawMoney();
    } else if (option === 5) {
      await this.depositMoney();
    } else if (option === 6) {
      process.exit(0);
    } else {
      console.log('Invalid option. Please choose a valid option.');
    }
  }
}

const bankApp = new BankApplication();
bankApp.start();
