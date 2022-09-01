import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getEmailFromToken, isAuthorLoggedIn, routeToHomePage } from 'src/app/utils';
import { AuthorService } from 'src/services/author.service';
import { BookService } from 'src/services/book.service';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  errFlag: boolean;
  successFlag:boolean;
  
  bookForm: FormGroup;

  @Input()
  updateThisBook :any;

  @Input() 
  heading:String="Create Book";
  
  constructor(private bookService:BookService,private authorService:AuthorService) { 

    this.errFlag = false;
    this.successFlag = false;


    if(!isAuthorLoggedIn()){
      routeToHomePage();
    }
    
    this.bookForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
      ]),
      content: new FormControl("", [
        Validators.required,
      ]),
      publisher: new FormControl("", [
        Validators.required,
      ]),
      releaseDate: new FormControl("", [
        Validators.required
      ]),
      price: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9.]+")
      ]),
      


      category: new FormControl("", [
        Validators.required,
      ]),
      rating: new FormControl(""),
      active: new FormControl(""),
      

    });

  }

  ngOnInit(): void {
  }

  createBook(){

    console.log("send req")
    console.log("form valid "+this.bookForm.valid)
    console.log("form valid ",this.bookForm)
    // setting manually authorId this code will remove later
    // this.bookForm.value["authorId"]=4;
    //

    console.log("form valid ",this.bookForm.value)
    let book = this.bookForm.value;
    if(this.heading == "Update Book"){
      console.log("Book Id changed");
      book.id=this.updateThisBook.id;
    }
    if(this.bookForm.valid){
      this.authorService.createBookByAuthor(getEmailFromToken(),book).subscribe({
        next:(res)=>{
          console.log("Book Created");
          console.log(res);
          this.successFlag=true;
          this.errFlag=false;
        },
        error:(err)=>{
          console.log("Book Creation Error");
          console.log(err);
          this.successFlag=false;
          this.errFlag=true;
        }
      })
    }else{
      this.errFlag=true;
      console.log("Form data is not correct !!!");
    }
    
  }

}
