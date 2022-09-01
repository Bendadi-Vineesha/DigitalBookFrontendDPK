import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }
  private host: string = `${environment.apiGateway}api/v1/reader`;

  subscribeBook(readerEmail: String, bookId: number) {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    return this.http.post(`${this.host}/${readerEmail}/${bookId}`, readerEmail, { headers: myHeaders });
  }

  getAllSubscribedBook(readerEmail: String) {
    return this.http.get(`${this.host}/${readerEmail}/books`);
  }

  getAllSubscribedBlockedBook(readerEmail: String) {
    return this.http.get(`${this.host}/${readerEmail}/blocked-books`);
  }

  unSubscribeBook(readerEmail:String, bookId:Number){
    return this.http.delete(`${environment.apiGateway}/api/v1/payment/${readerEmail}/unsubscribe/${bookId}`);
  }
}
