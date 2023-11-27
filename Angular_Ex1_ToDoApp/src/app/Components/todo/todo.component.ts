import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  newTask: string = '';
  tasks: any[] = [];
  completedTasks: any[] = [];

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ description: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  markAsCompleted(task: any) {
    task.completed = true;
    this.completedTasks.push(task);
    this.deleteTask(task);
  }

  deleteCompletedTask(completedTask: any) {
    const index = this.completedTasks.indexOf(completedTask);
    if (index !== -1) {
      this.completedTasks.splice(index, 1);
    }
  }
}
