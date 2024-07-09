import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = "http://localhost:3000/category/"
  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get<any>(`${this.apiUrl}getallcategories`)
  }
  addCategory(categoryData:any){
    return this.http.post<any>(`${this.apiUrl}addcategory`,categoryData)
  }
  deleteCategory(id:string){
    return this.http.delete<any>(`${this.apiUrl}deletecategory/${id}`)
  }
  updateCategory(id:string,categoryData:any){
    return this.http.put<any>(`${this.apiUrl}updatecategory/${id}`,categoryData)
  }
  getCategoryById(id:string){
    return this.http.get<any>(`${this.apiUrl}getcategorybyid/${id}`)
  }
}
