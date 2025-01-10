import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IRegisterUser, IUser, IUserCredentials, IUserRegisterCredentials } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<IUser | null>;
  private registerUser: BehaviorSubject<IRegisterUser | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null>(null);
    this.registerUser = new BehaviorSubject<IRegisterUser | null>(null);
  }

  getUser(): Observable<IUser | null> {
    return this.user;
  }

  getRegisterUser(): Observable<IRegisterUser | null> {
    return this.registerUser.asObservable();
  }

  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http
      .post<IUser>('/api/sign-in', credentials)
      .pipe(map((user: IUser) => {
        this.user.next(user);
        return user;
      }));
  }

  register(registerCredentials: IUserRegisterCredentials): Observable<IRegisterUser>{
    return this.http
    .post<IRegisterUser>('api/register', registerCredentials)
    .pipe(map((user: IRegisterUser) => {
      this.registerUser.next(user);
      return user;
    }));
  }

  signOut() {
    this.user.next(null);
  }
}
