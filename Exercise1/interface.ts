// interface.ts
export interface AccountDetails {
    customerName: string;
    email: string;
    accountType: string;
    totalBalance: number;
  }
  
  export interface BankService {
    createNewAccount(): void;
    viewBalance(accountNumber: string): void;
    viewCustomerData(accountNumber: string): void;
    withdrawMoney(accountNumber: string, amount: number): void;
    depositMoney(accountNumber: string, amount: number): void;
  }
  