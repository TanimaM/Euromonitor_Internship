import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-dept-no-action',
  templateUrl: './dept-no-action.component.html',
  styleUrls: ['./dept-no-action.component.css'],
})
export class DeptNoActionComponent implements OnInit {
  public departments: Department[] = [];
  public departmentsToDisplay: Department[] = [];

  constructor(private departmentService: DepartmentService) {}

  public ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.departmentsToDisplay = [...this.departments]; 
      },
      error: (err) => {
        console.error('Error fetching departments', err);
      }
    });
  }
  

  public searchDepartments(event: any):void{
    const searchKey = event.target.value.toLowerCase();
    this.departmentsToDisplay = this.departments.filter((department) => {
      return department.departmentName.toLowerCase().includes(searchKey);
    });
  }
}
