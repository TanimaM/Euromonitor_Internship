import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor() {
    this.employee = {
    id: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Department: '',
    JobTitle: '',
    HireDate: '',
    TerminationDate: null,
    IsActive: true,
    CreatedAt: '',
    UpdatedAt: '',
    photo: '',
    appraisal: ''
    };
  }

  public ngOnInit(): void {
    console.log(this.employee);
  }

  public deleteEmployeeClicked():void {
    this.onRemoveEmployee.emit(this.employee.id);
  }

  public editEmployeeClicked():void{
    this.onEditEmployee.emit(this.employee.id);
  }
}