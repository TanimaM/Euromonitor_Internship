
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskForm!: FormGroup;
  filterCategory!: string; 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private router: Router, 
    private authService: AuthService 
  ) {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/login']); 
      return;
    }

    this.taskForm = this.fb.group({
      title: [data ? data.title : '', Validators.required],
      completed: [data ? data.completed : false, Validators.required],
      dueDate: [data ? data.dueDate : null],
      category: [data ? data.category : ''],
    });
  }

  public submitForm(): void {
    if (this.taskForm.valid) {
      const editedTask: Task = this.taskForm.value;
      this.dialogRef.close(editedTask);
    }
  }
}
