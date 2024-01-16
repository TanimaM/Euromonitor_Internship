import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  @Input() department: Department;
  @Output() onRemoveDepartment = new EventEmitter<number>();
  @Output() onEditDepartment = new EventEmitter<number>();

  constructor() {
    this.department = {
      id: 0,
      departmentName: '',
      description: ''
    };
  }

  public ngOnInit(): void {
    console.log(this.department);
  }

  public deleteDepartmentClicked(): void {
    this.onRemoveDepartment.emit(this.department.id);
  }

  public editDepartmentClicked(): void {
    this.onEditDepartment.emit(this.department.id);
  }
}
