
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { UserAccount } from 'src/app/models/user-accounts.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserAccService } from 'src/app/services/user-account.service';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-emp-no-action',
  templateUrl: './emp-no-action.component.html',
  styleUrls: ['./emp-no-action.component.css'],
})
export class EmpNoActionComponent implements OnInit {
  public employees: Employee[] = [];
  public employeesToDisplay: Employee[] = [];
  public userAccounts: UserAccount[] = [];

  public isEditingEmail: boolean = false;
  public editedEmail: string = '';
  public isEditingPhoneNumber: boolean = false;
  public editedPhoneNumber: string = '';

  constructor(
    private employeeService: EmployeeService,
    private userAccService: UserAccService,
    private authService: AuthService 
  ) {}

  public ngOnInit(): void {
    this.userAccService.getUserAccounts().subscribe({
      next: (userAccounts) => {
        this.userAccounts = userAccounts;
        this.loadEmployeesToDisplay();
      },
      error: (err) => {
        console.error('Error fetching user accounts', err);
      }
    });
  }
  

  public loadEmployeesToDisplay(): void {
    this.authService.getCurrentUser().subscribe({
      next: (currentUser) => {
        if (currentUser) {
          const loggedInEmployeeID = currentUser.EmployeeID;
  
          this.employeeService.getEmployees().subscribe({
            next: (employees) => {
              this.employeesToDisplay = employees.filter(employee => employee.id === loggedInEmployeeID);
            },
            error: (error) => {
              console.error('Error fetching employees', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching current user', error);
      }
    });
  }

  public startEditing(field: string): void {
    if (field === 'email') {
      this.isEditingEmail = true;
      this.editedEmail = this.employeesToDisplay[0].Email; 
    } else if (field === 'phoneNumber') {
      this.isEditingPhoneNumber = true;
      this.editedPhoneNumber = this.employeesToDisplay[0].PhoneNumber; 
    }
  }

  public saveChanges(field: string): void {
    if (field === 'email') {
      this.employeesToDisplay[0].Email = this.editedEmail;
      this.isEditingEmail = false;
    } else if (field === 'phoneNumber') {
      this.employeesToDisplay[0].PhoneNumber = this.editedPhoneNumber;
      this.isEditingPhoneNumber = false;
    }

    this.employeeService.updateEmployee(this.employeesToDisplay[0]).subscribe({
      next: (updatedEmployee) => {
        console.log('Employee updated successfully:', updatedEmployee);
      },
      error: (err) => {
        console.error('Error updating employee', err);
      }
    });    
  }
}
 
