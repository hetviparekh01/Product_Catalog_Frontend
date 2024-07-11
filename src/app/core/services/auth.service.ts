import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = "http://localhost:3000/user/"
  constructor(private http: HttpClient) { }

  signup(userData: FormData) {
    return this.http.post<any>(`${this.apiUrl}signup`, userData)
  }
  login(userData: IUser) {
    return this.http.post<any>(`${this.apiUrl}login`, userData)
  }
}
