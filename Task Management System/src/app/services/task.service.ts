
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; 

  constructor(private http: HttpClient) {}


  getTasksByUserId(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?userId=${userId}`);
  }
  
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  
  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}