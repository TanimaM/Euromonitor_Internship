import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-crud',
  templateUrl: './emp-crud.component.html',
  styleUrls: ['./emp-crud.component.css']
})
export class EmpCrudComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('appraisalFileInput') appraisalFileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title = 'Employee Management System';

  public employeeForm: FormGroup;
  public employees: Employee[];
  public employeesToDisplay: Employee[];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  public ngOnInit(): void {
    this.employeeForm = this.fb.group({
      FirstName: this.fb.control(''),
      LastName: this.fb.control(''),
      Email: this.fb.control(''),
      PhoneNumber: this.fb.control(''),
      Department: this.fb.control(''),
      JobTitle: this.fb.control(''),
      HireDate: this.fb.control(''),
      TerminationDate: this.fb.control(''),
      IsActive: this.fb.control(false),
      CreatedAt: this.fb.control(''),
      UpdatedAt: this.fb.control(''),

    });

    this.employeeService.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    });
  }

  public ngAfterViewInit(): void {
  }

  public addEmployee(): void {
    let employee: Employee = {
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Email: this.Email.value,
      PhoneNumber: this.PhoneNumber.value,
      Department: this.Department.value,
      JobTitle: this.JobTitle.value,
      HireDate: this.HireDate.value,
      TerminationDate: this.TerminationDate.value,
      IsActive: this.IsActive.value,
      CreatedAt: this.CreatedAt.value,
      UpdatedAt: this.UpdatedAt.value,
      photo: this.fileInput.nativeElement.files[0]?.name,
      appraisal: this.appraisalFileInput.nativeElement.files[0]?.name,
      id: 0
    };
  
    this.employeeService.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }
  

  public removeEmployee(event: any):void {
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.employeeService.deleteEmployee(event).subscribe(() => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

  public editEmployee(event: any): void {
    this.employees.forEach((val) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  public setForm(emp: Employee): void {
    this.FirstName.setValue(emp.FirstName);
    this.LastName.setValue(emp.LastName);
    this.Email.setValue(emp.Email);
    this.PhoneNumber.setValue(emp.PhoneNumber);
    this.Department.setValue(emp.Department);
    this.JobTitle.setValue(emp.JobTitle);
    this.HireDate.setValue(emp.HireDate);
    this.TerminationDate.setValue(emp.TerminationDate);
    this.IsActive.setValue(emp.IsActive);
    
    if (emp.CreatedAt !== null && emp.CreatedAt !== undefined) {
      this.CreatedAt.setValue(emp.CreatedAt);
    }
  
    this.UpdatedAt.setValue(emp.UpdatedAt);
    this.fileInput.nativeElement.value = '';
    this.appraisalFileInput.nativeElement.value = '';
  }
  

  public searchEmployees(event: any): void {
    let filteredEmployees: Employee[] = [];

    if (event === '') {
      this.employeesToDisplay = this.employees;
    } else {
      filteredEmployees = this.employees.filter((val, index) => {
        let targetKey = val.FirstName.toLowerCase() + '' + val.LastName.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filteredEmployees;
      
    }
  }

  public clearForm(): void {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue('');
    this.PhoneNumber.setValue('');
    this.Department.setValue('');
    this.JobTitle.setValue('');
    this.HireDate.setValue('');
    this.TerminationDate.setValue('');
    this.IsActive.setValue('');
    this.CreatedAt.setValue('');
    this.UpdatedAt.setValue('');
    this.fileInput.nativeElement.value = '';
    this.appraisalFileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('FirstName') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('LastName') as FormControl;
  }
  public get Email(): FormControl {
    return this.employeeForm.get('Email') as FormControl;
  }
  public get PhoneNumber(): FormControl {
    return this.employeeForm.get('PhoneNumber') as FormControl;
  }
  public get Department(): FormControl {
    return this.employeeForm.get('Department') as FormControl;
  }
  public get JobTitle(): FormControl {
    return this.employeeForm.get('JobTitle') as FormControl;
  }
  public get HireDate(): FormControl {
    return this.employeeForm.get('HireDate') as FormControl;
  }
  public get TerminationDate(): FormControl {
    return this.employeeForm.get('TerminationDate') as FormControl;
  }
  public get IsActive(): FormControl {
    return this.employeeForm.get('IsActive') as FormControl;
  }
  public get CreatedAt(): FormControl {
    return this.employeeForm.get('CreatedAt') as FormControl;
  }
  public get UpdatedAt(): FormControl {
    return this.employeeForm.get('UpdatedAt') as FormControl;
  }
}
