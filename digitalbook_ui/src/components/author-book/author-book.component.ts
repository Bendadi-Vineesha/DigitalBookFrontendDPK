import { Component, OnInit } from '@angular/core';
import { getEmailFromToken } from 'src/app/utils';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.scss']
})
export class AuthorBookComponent implements OnInit {


  books = [{}];


  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthorsBook();
  }

  getAuthorsBook() {
    this.authorService.getAuthorsBook(getEmailFromToken()).subscribe({
      next: (res: any) => {
        console.log("res", res);
        this.books = res;

      },
      error: (err) => {
        console.log("err", err);
      }

    })

  }

}
