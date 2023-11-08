import * as readline from 'readline';

class BankAccount {

  accountNumber: string;
  customerName: string;
  age: number;
  location: string;
  state: string;
  country: string;
  email: string;
  balance: number;

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

  private generateAccountNumber(): string {
    const accountTypePrefix = this.constructor === SavingsAccount ? 'Sav' : 'Cur';
    return `${accountTypePrefix}${Math.floor(100000 + Math.random() * 900000)}`;
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log('You cannot withdraw the amount due to insufficient balance.');
    }
  }

  getAccountDetails(): string {
    return `Customer Name: ${this.customerName}
Email ID: ${this.email}
Type of Account: ${this.constructor.name}
Total Balance: ${this.balance}`;
  }
}

class SavingsAccount extends BankAccount {
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

  deposit(amount: number) {
    if (amount >= 500) {
      super.deposit(amount);
    } else {
      console.log('Minimum deposit for Savings Account is 500.');
    }
  }
}

class CurrentAccount extends BankAccount {
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
  deposit(amount: number) {
    if (amount >= 800) {
      super.deposit(amount);
    } else {
      console.log('Minimum deposit for Current Account is 800.');
    }
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log('Balance is less, Use Overdraft');
    } else {
      super.withdraw(amount);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to Our Bank Application');

function displayMenu() {
  console.log(`
Enter your option:
1. Open Savings or Current Account
2. View Balance
3. View Customer Data
4. Withdraw Money
5. Deposit Money
6. Exit from Application
  `);
}

function createNewAccount() {
  let ageTries = 0;

  const attemptToCreateAccount = () => {
    rl.question('Select Account Type (Savings/Current): ', (accountType) => {
      if (accountType === 'Savings' || accountType === 'Current') {
        rl.question('Customer Name: ', (customerName) => {
          const promptAge = () => {
            rl.question('Age: ', (age) => {
              if (parseInt(age) > 68) {
                ageTries++;
                if (ageTries < 2) {
                  console.log('You are not eligible for account opening.');
                  promptAge();
                } else {
                  console.log('Limit reached for entering age. Exiting account creation.');
                  displayMenu();
                  processInput();
                }
              } else {
                rl.question('Location: ', (location) => {
                  rl.question('State: ', (state) => {
                    rl.question('Country: ', (country) => {
                      rl.question('Email ID: ', (email) => {
                        rl.question('Initial Balance(Optional): ', (initialBalance) => {
                          try {
                            const account =
                              accountType === 'Savings'
                                ? new SavingsAccount(
                                    customerName,
                                    parseInt(age),
                                    location,
                                    state,
                                    country,
                                    email,
                                    parseFloat(initialBalance)
                                  )
                                : new CurrentAccount(
                                    customerName,
                                    parseInt(age),
                                    location,
                                    state,
                                    country,
                                    email,
                                    parseFloat(initialBalance)
                                  );
                            accounts.push(account); 
                            console.log(`Account Created! Your Account Number is: ${account.accountNumber}`);
                            displayMenu();
                            processInput();
                          } catch (error) {
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
      } else {
        console.log('Invalid account type. Please choose Savings or Current.');
        displayMenu();
        processInput();
      }
    });
  };

  attemptToCreateAccount();
}

const accounts: BankAccount[] = [];

function viewBalance() {
  rl.question('Enter Account Number to check balance: ', (accountNumber) => {
    const account = accounts.find((acc) => acc.accountNumber === accountNumber);
    if (account) {
      console.log(`Balance for ${accountNumber}: ${account.balance}`);
    } else {
      console.log('Account not found.');
    }
    displayMenu();
    processInput();
  });
}

function viewCustomerData() {
  rl.question('Enter Account Number to display details: ', (accountNumber) => {
    const account = accounts.find((acc) => acc.accountNumber === accountNumber);
    if (account) {
      console.log(account.getAccountDetails());
    } else {
      console.log('Account not found.');
    }
    displayMenu();
    processInput();
  });
}

function withdrawMoney() {
  rl.question('Enter Account Number to withdraw from: ', (accountNumber) => {
    const account = accounts.find((acc) => acc.accountNumber === accountNumber);
    if (account) {
      rl.question('Enter the amount to withdraw: ', (amount) => {
        account.withdraw(parseFloat(amount));
        console.log(`Current balance: ${account.balance}`);
        displayMenu();
        processInput();
      });
    } else {
      console.log('Account not found.');
      displayMenu();
      processInput();
    }
  });
}

function depositMoney() {
  rl.question('Enter Account Number to deposit to: ', (accountNumber) => {
    const account = accounts.find((acc) => acc.accountNumber === accountNumber);
    if (account) {
      rl.question('Enter the amount to deposit: ', (amount) => {
        account.deposit(parseFloat(amount));
        console.log(`Current balance: ${account.balance}`);
        displayMenu();
        processInput();
      });
    } else {
      console.log('Account not found.');
      displayMenu();
      processInput();
    }
  });
}

function processInput() {
  rl.question('Enter your option: ', (option) => {
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
