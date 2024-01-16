import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-dept-crud',
  templateUrl: './dept-crud.component.html',
  styleUrls: ['./dept-crud.component.css']
})
export class DeptCrudComponent implements OnInit, AfterViewInit {
  @ViewChild('addDepartmentButton') addDepartmentButton: any;
  title = 'Department Management System';

  public departmentForm: FormGroup;
  public departments: Department[];
  public departmentsToDisplay: Department[];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = fb.group({
      departmentName: [''],
      description: ['']
    });

    this.departments = [];
    this.departmentsToDisplay = this.departments;
  }

  public ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res.reverse(); 
      this.departmentsToDisplay = this.departments;
    });
  }

  public ngAfterViewInit(): void {
  }

  public addDepartment():void {
    let department: Department = {
      departmentName: this.DepartmentName.value,
      description: this.Description.value
    };

    this.departmentService.postDepartment(department).subscribe((res) => {
      this.departments.unshift(res); 
      this.clearForm();
    });
  }

  public removeDepartment(event: any):void {
    const departmentId = parseInt(event, 10);
    const index = this.departments.findIndex((dept) => dept.id === departmentId);

    if (index !== -1) {
      this.departmentService.deleteDepartment(event).subscribe(() => {
        this.departments.splice(index, 1);
      });
    }
  }

  public editDepartment(event: any): void {
    const departmentId = parseInt(event, 10);
  const departmentIndex = this.departments.findIndex((dept) => dept.id === departmentId);

  if (departmentIndex !== -1) {
    const editedDepartment = this.departments[departmentIndex];
    this.setForm(editedDepartment);
    this.removeDepartment(event);
    this.addDepartmentButton.nativeElement.click();
    }
   
  }

  public setForm(department: Department): void {
    this.DepartmentName.setValue(department.departmentName);
    this.Description.setValue(department.description);
  }

  public searchDepartments(event: any): void {
    let filteredDepartments: Department[] = [];

    if (event === '') {
      this.departmentsToDisplay = this.departments;
    } else {
      const searchKey = event.toLowerCase();
      filteredDepartments = this.departments.filter((dept) =>
        dept.departmentName.toLowerCase().includes(searchKey)
      );
      this.departmentsToDisplay = filteredDepartments;
    }
  }

  public clearForm(): void {
    this.DepartmentName.setValue('');
    this.Description.setValue('');
  }

  public get DepartmentName(): FormControl {
    return this.departmentForm.get('departmentName') as FormControl;
  }

  public get Description(): FormControl {
    return this.departmentForm.get('description') as FormControl;
  }
}
