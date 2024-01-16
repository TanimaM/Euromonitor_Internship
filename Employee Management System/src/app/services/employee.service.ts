import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  updateEmail(id: number | undefined, arg1: { Email: any; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }

  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
