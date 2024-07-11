import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  apiUrl: string = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) {}

  getParticularUser(){
    return this.http.get<any>(`${this.apiUrl}/getparticularuser`)
  }
}
