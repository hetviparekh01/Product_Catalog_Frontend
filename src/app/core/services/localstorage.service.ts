import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(token:string){
    localStorage.setItem('accesstoken',token)
  }
  getToken(){
    return localStorage.getItem('accesstoken')
  }
  setRole(role:string){
    localStorage.setItem('role',role)
  }
  getRole(){
    return localStorage.getItem('role')
  }
  setName(name:string){
    localStorage.setItem('name',name)
  }
  getName(){
    return localStorage.getItem('name')
  }
  clearLocalstorage(){
    localStorage.clear();
  }
}
