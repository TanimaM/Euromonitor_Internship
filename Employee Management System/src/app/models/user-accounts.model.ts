
export interface UserAccount {
    UserID: number;
    Username: string;
    Password: string;
    RoleID: number;
    Role: string;
    EmployeeID?: number | null;
  }
  