import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.value;
  authorEmail:any="";

  constructor(private bookService: BookService) {
    console.log("----", this._isLoggedIn$);
    console.log("----", this.isLoggedIn$);

    const token = localStorage.getItem("digibook_token");
    this._isLoggedIn$.next(!!token);
    if(this._isLoggedIn$.value)
    {
      this.isLoggedIn$=true;
      //// getting Email from Token
      this.authorEmail=atob(token!=null?token.split(".")[1]:"");
      this.authorEmail=JSON.parse(this.authorEmail)["sub"];      
    }
  }

  ngOnInit(): void {
  }

  getBookByTitle(title: string) {
    this.bookService.getByTitle(title).subscribe({
      next: (res => {
        console.log("list ", res);
      }),
      error: (err) => {
        console.log("list ", err);
      }
    })
  }

  

  getLogout() {
    localStorage.removeItem("digibook_token");
    // const token=localStorage.getItem("digibook_token");
    this._isLoggedIn$.next(false);
    this.isLoggedIn$=false;
  }

}
