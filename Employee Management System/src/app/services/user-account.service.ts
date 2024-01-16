
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccount } from '../models/user-accounts.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccService {
  private apiUrl = 'http://localhost:3000/userAccounts';

  constructor(private http: HttpClient) {}

  public getUserAccounts(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.apiUrl);
  }

  public getUserByUsernameAndPassword(username: string, password: string): Observable<UserAccount | null> {
    return this.http.get<UserAccount[]>(`${this.apiUrl}?Username=${username}&Password=${password}`)
      .pipe(
        map((userAccounts: UserAccount[]) => {
          return userAccounts.length > 0 ? userAccounts[0] : null;
        })
      );
  }
}
