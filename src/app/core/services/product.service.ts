import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = "http://localhost:3000/product/"
  constructor(private http: HttpClient) { }

  getAllProducts(queryParams:any){
    return this.http.get<any>(`${this.apiUrl}getallproducts`,{
      params:queryParams
    })
  }
  addProduct(productData:FormData){
    return this.http.post<any>(`${this.apiUrl}addproduct`,productData)
  }
  deleteProduct(id:string){
    return this.http.delete<any>(`${this.apiUrl}deleteproduct/${id}`)
  }
  getProductById(id:string){
    return this.http.get<any>(`${this.apiUrl}getproductbyid/${id}`)
  }
  updateProduct(id:string,productData:FormData){
    return this.http.put<any>(`${this.apiUrl}updateproduct/${id}`,productData)
  }

}
