import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './../components/header/header.component';
import { FooterComponent } from './../components/footer/footer.component';
import { HomeComponent } from './../pages/home/home.component';
import { LoginComponent } from './../pages/login/login.component';
import { SignupComponent } from './../pages//signup/signup.component';
import { BookComponent } from '../components/book/book.component';
import { CreateBookComponent } from '../components/create-book/create-book.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../components/alert/alert.component';
import { AlertSuccessComponent } from '../components/alert-success/alert-success.component';
import { AuthorBookComponent } from '../components/author-book/author-book.component';
import { NotfoundComponent } from 'src/components/notfound/notfound.component';

const routes:Routes = [
    // { path: '', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create-book', component: CreateBookComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/signup', component: SignupComponent },
    { path: 'mybooks', component: AuthorBookComponent },
    { path: '**', component: NotfoundComponent }
    // { path: '**', redirectTo: 'home' }
  ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    CreateBookComponent,
    AlertComponent,
    AlertSuccessComponent,
    AuthorBookComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

