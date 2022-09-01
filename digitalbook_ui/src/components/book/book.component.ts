import { Component, Input, OnInit } from '@angular/core';
import { availableForRefund } from 'src/app/utils';
import { BookService } from 'src/services/book.service';
import { ReaderService } from 'src/services/reader.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input()
  book: any;

  @Input()
  successBtn: String = "";

  @Input()
  authorBtn: String = "";

  errFlag: boolean;
  successFlag: boolean;

  constructor(private readerService: ReaderService, private bookService: BookService) {
    this.errFlag = false;
    this.successFlag = false;

  }

  ngOnInit(): void {
  }

  blockUnblockBook(book: any) {
    book.active = !book.active;
    this.bookService.updateBook(book).subscribe({
      next: (res) => {
        console.log("updated", res);

      },
      error: (err) => {
        console.log("not updated", err);


      }
    })
    //
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe({
      next: (res) => {
        console.log("updated", res);

      },
      error: (err) => {
        console.log("not updated", err);


      }
    })
    //
  }

  unSubscribeBook(readerEmail:String, bookId: number) {
    console.log("Unsubscribe book");
    
    this.readerService.unSubscribeBook(readerEmail,bookId).subscribe({
      next: (res) => {
        console.log("Unsubscribe DOne", res);

      },
      error: (err) => {
        console.log("Unsubscribe not updated", err);


      }
    })
   
    //
  }

  availableForRefund(book:any){
    console.log("====date ",book);
    
    return availableForRefund(this.book.releaseDate)
  }

  subscribeBook(readerEmail: String, bookId: number) {
    console.log(readerEmail);
    this.readerService.subscribeBook(readerEmail, bookId).subscribe({
      next: (res) => {
        console.log("Subscribe Successfully", res);
        this.successFlag = true;
        this.errFlag = false;
      },
      error: (err) => {
        console.log("Subscribe Unsuccessfully", err);
        this.successFlag = false;
        this.errFlag = true;
      }
    })



  }

}
