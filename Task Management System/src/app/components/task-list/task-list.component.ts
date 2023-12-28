
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { DateSortPipe } from 'src/app/pipes/date-sort.pipe'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [DateSortPipe] 
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterCategory = '';
  categories: string[] = [];
  tasksFiltered: Task[] = [];
  sortByDueDate = false;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private dateSortPipe: DateSortPipe, 
    private router: Router, 
    private authService: AuthService
  
    ) {}

    ngOnInit(): void {
      if (!this.authService.isAuthenticatedUser()) {
        this.router.navigate(['/login']);
        return;
      }
      this.extractCategories();
      this.loadTasks();
    }



    loadTasks(): void {
      const userId = this.authService.getAuthenticatedUserId();
      if (userId !== null) {
        this.taskService.getTasksByUserId(userId).subscribe(tasks => {
          if (this.sortByDueDate) {
            tasks = this.dateSortPipe.transform(tasks, 'dueDate');
          }
  
          this.tasks = tasks;
          this.extractCategories();
          this.filterTasks();
        });
      }
    }
  

  extractCategories(): void {
    this.categories = Array.from(
      new Set(this.tasks.map((task) => task.category))
    )
    .filter((category): category is string => !!category); 
  }

  filterTasks(): void {
    let filteredTasks = this.tasks;
    if (this.filterCategory) {
      filteredTasks = filteredTasks.filter(task => task.category === this.filterCategory);
    }

    this.tasksFiltered = filteredTasks;
  }

  onFilterCategoryChange(): void {
    this.filterTasks();
  }

  toggleSortByDueDate(): void {
    this.sortByDueDate = !this.sortByDueDate;
    this.loadTasks(); 
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: { ...task }, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.authService.getAuthenticatedUserId();
  
        if (userId !== null) {
          result.userId = userId;
  
          if (task.id) {
            this.updateTask(task.id, result);
          } else {
            this.addTask(result);
          }
        }
      }
    });
  }
  

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.extractCategories(); 
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask(result);
      }
    });
  }

  addTask(newTask: Task): void {
    const userId = this.authService.getAuthenticatedUserId();

    if (userId !== null) {
      newTask.userId = userId;

      this.taskService.addTask(newTask).subscribe(addedTask => {
        this.tasks.push(addedTask);
        this.extractCategories();
      });
    }
  }

  updateTask(id: number, updatedTask: Task): void {
    this.taskService.editTask({ ...updatedTask, id }).subscribe(() => {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.extractCategories(); 
    });
  }
}