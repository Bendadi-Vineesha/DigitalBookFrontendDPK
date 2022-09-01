import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { getEmailFromToken } from 'src/app/utils';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {


  private host: string = `${environment.apiGateway}api/v1/author/`;



  constructor(private http: HttpClient) { }
/**
 * Fetch all author list from the API
 * @returns 
 */
  fetchAllAuthor() {
    // return this.http.get(this.host);
    return this.http.get(this.host + "fetch-all-author");
  }
  getById(id: number) {
    // return this.http.get(this.host+"/"+id);
    return this.http.get(`${this.host}/${id}`);
  }

  /**
   * Getting Authors Book. Which is written by author.
   */
  getAuthorsBook(authorEmail:String){
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders=myHeaders.set("Content-Type", "application/json");
    myHeaders=myHeaders.set("Authorization", `Bearer ${localStorage.getItem("digibook_token")}`);
    return this.http.get(`${this.host}${authorEmail}/books`,{headers:myHeaders});
  }

  /**
   * Creating Author by singup request
   * 
   * @param a 
   * @returns 
   */
  createAuthor(a: any) {
    let author = {
      "authorName": a.firstName + " " + a.lastName,
      "authorEmail": a.authorEmail,
      "authorPass": a.authorPass,
      "gender": a.gender
    }

    console.log("author details to send", author);

    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    return this.http.post(this.host + "signup", author, { headers: myHeaders });
  }


  /**
   *  Creating book by author
   */
  createBookByAuthor(email:string,book: any) {
    
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders=myHeaders.set("Content-Type", "application/json");
    myHeaders=myHeaders.set("Authorization", `Bearer ${localStorage.getItem("digibook_token")}`);

    return this.http.post(`${this.host}${email}/books` , book, { headers: myHeaders });
  }

  delete(id: number) {
    return this.http.delete(`${this.host}/${id}`);
  }


  /**
   * Login with username and Password to generate valid token from API side
   * @param userDetails 
   * @returns 
   */
  authenticate(userDetails: any) {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");

    return this.http.post(this.host + "authenticate", userDetails, { headers: myHeaders });
  }


}
