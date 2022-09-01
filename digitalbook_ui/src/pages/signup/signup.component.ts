import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/services/author.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  authorForm: FormGroup;

  errFlag: boolean;
  successFlag:boolean;

  constructor(private authorService:AuthorService) {

    this.errFlag = false;
    this.successFlag = false;

    this.authorForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z]+")
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z]+")
      ]),
      authorEmail: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z0-9._]+@[A-Za-z]+\\.[a-z]{2,3}")
      ]),
      authorPass: new FormControl(""),
      authorConfirmPass: new FormControl(""),
      gender: new FormControl("")
    });
  }

  ngOnInit(): void {
  }


  getSignUp(){
    console.log("send req")
    console.log("form valid "+this.authorForm.valid)
    if(this.authorForm.valid &&
      this.authorForm.value.authorPass == this.authorForm.value.authorConfirmPass){
        this.authorService.createAuthor(this.authorForm.value).subscribe({
          next:(res)=>{
            console.log("Db m save ho gya");
            console.log(res);
            this.successFlag=true;
          },
          error:(err)=>{
            this.errFlag = true;
            console.log("Db m save krte time err aa gya");
            console.log(err);

          }
        })
    }else{
      this.errFlag = true;
      console.log("Form data is not correct !!!");
    }
    console.log(this.authorForm);
    console.log(this.authorForm.value);
    // service.login(this.myForm.value).subscribe({})
}

}
