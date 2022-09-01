import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private host:string = `${environment.apiGateway}api/v1/book/`;

  constructor(private http:HttpClient) { }

  fetchAllbook(){
    // return this.http.get(this.host);
    return this.http.get(this.host+"fetch-all-book");
  }
  
  fetchAllActivebook(){
    // return this.http.get(this.host);
    return this.http.get(this.host+"fetch-all-activebook");
  }
  createBook(authorId:number, book:any){
    let myHeaders:HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    return this.http.post(`${this.host}${authorId}`, book, {headers: myHeaders});
  }

  updateBook(book:any){
    let myHeaders:HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    return this.http.put(`${this.host}`, book, {headers: myHeaders});
  }

  deleteBook(bookId:number){
    let myHeaders:HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    return this.http.delete(`${this.host}${bookId}`,);
  }

  getByTitle(name:string){
    // return this.http.get(this.host+"/"+id);
    return this.http.get(`${this.host}/search?title=${name}`);
  }
  
  getById(id:number){
    // return this.http.get(this.host+"/"+id);
    return this.http.get(`${this.host}/${id}`);
  }
  
  delete(id:number){
    return this.http.delete(`${this.host}/${id}`);
  }



}
