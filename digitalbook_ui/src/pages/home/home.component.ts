import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';
import { ReaderService } from 'src/services/reader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 books = [{}];
 subsribedBooks =[{}];
 searchedBooks =[{}];
 blockedSubscribedBooks = [{}];

  constructor(private bookService: BookService, private readerService:ReaderService) { }
  ngOnInit(): void {
    this.fetchAllBook();
    // this.fetchAllSubscribedBook("deepak@gmail.com");
  }


  /**
   * Fetch all book list to Search list . Which user can subscribe
   */
  getBookByTitle(title: string) {
    this.bookService.getByTitle(title).subscribe({
      next: (res: any) => {
        // console.log("Book fetched is success")
        console.log(res);
        this.searchedBooks= res

      },
      error: (err: any) => {
        // console.log("Book Fetched is failed")
        console.log(err)
      }
    })
  }
  /**
   * Fetch all book list to show in home page. Which user can subscribe
   */
  fetchAllBook(){
    this.bookService.fetchAllActivebook().subscribe({
      next: (res: any) => {
        console.log("Book fetched is success")
        console.log(res);
        this.books= res

      },
      error: (err: any) => {
        console.log("Book Fetched is failed")
        console.log(err)
      }
    })
  }

  /**
   * Fetch all the subscribed book by reader
   * @param readerEmail 
   */
  fetchAllSubscribedBook(readerEmail:String){
    this.fetchListSubscribedBookWhichIsBlocked(readerEmail);
    this.readerService.getAllSubscribedBook(readerEmail).subscribe({
      next: (res: any) => {
        console.log("Subscribed Book fetched is success")
        console.log(res);
        this.subsribedBooks= res;

      },
      error: (err: any) => {
        console.log("Subscribed Book Fetched is failed")
        console.log(err)
      }
    })
  }

  /**
   * Fetch all list of subscribed Book which is blocked by the Author.
   * @param readerEmail 
   */
   fetchListSubscribedBookWhichIsBlocked(readerEmail:String){
    this.readerService.getAllSubscribedBlockedBook(readerEmail).subscribe({
      next: (res: any) => {
        console.log("Subscribed Blocked Book fetched is success")
        console.log(res);
        this.blockedSubscribedBooks= res;

      },
      error: (err: any) => {
        console.log("Subscribed  Blocked Book Fetched is failed")
        console.log(err)
      }
    })
  }
}
