import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // constructor(){}
  errFlag: boolean;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private authorService: AuthorService, private router: Router) {
    this.errFlag = false;


    this._routeToHomePage();

  }

  _routeToHomePage() {
    const token = localStorage.getItem("digibook_token");
    this._isLoggedIn$.next(!!token);
    if (this._isLoggedIn$.value) {
      this.router.navigate(["/home"]);
    }
  }

  _routeToSignUpPage(){     
    console.log("signup");
    
    this.router.navigate(["/signUp"]);
  }


  ngOnInit(): void {


  }

  login(authorEmail: string, authorPass: string): void {
    console.log("Login Operation " + authorEmail + " " + authorPass);
    let userDetails = {
      "username": authorEmail,
      "password": authorPass
    };
    this.authorService.authenticate(userDetails).subscribe({
      next: (res: any) => {
        console.log("Login is success")
        console.log(res);
        this._isLoggedIn$.next(true);
        localStorage.setItem("digibook_token", res.token)
        
        this._routeToHomePage();
        this.errFlag = false;

      },
      error: (err: any) => {
        console.log("Login failed")
        console.log(err)
        this.errFlag = true;
      }
    })
  }
}
