import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public newTask: string = '';
  public tasks: any[] = [];
  public completedTasks: any[] = [];

  public addTask(): void {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ description: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  public deleteTask(task: any): void {
    let index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public markAsCompleted(task: any):void {
    task.completed = true;
    this.completedTasks.push(task);
    this.deleteTask(task);
  }

  public deleteCompletedTask(completedTask: any):void {
    let index = this.completedTasks.indexOf(completedTask);
    if (index !== -1) {
      this.completedTasks.splice(index, 1);
    }
  }
}
