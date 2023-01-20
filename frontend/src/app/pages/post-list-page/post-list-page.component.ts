import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post.models';
import { User } from '../models/User.models';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit, OnDestroy {

  subscription$ :Subscription;
  postByUser ?:Post[] = [];
  user :User;
  postUser :User;
  prenom ?:User;
  nom ?:User;
  image ?:User;
  email ?:User;
  telephone ?:User;
  mailTo :string = '';
  telTo :string = '';
  data :any[];

  errorServeur ?:string = '';
  
  constructor(
    private _activeRoute :ActivatedRoute,
    private _userService :UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.subscription$ = this._activeRoute.paramMap.subscribe((res:any) => {
      this._userService.getPostByUser(res.get("id")).subscribe({
        next: data => {
          this.postByUser = [];
          this.data = data;
          if (data) {
            this.prenom = data.prenom;
            this.nom = data.nom;
            this.email = data.email;
            this.telephone = data.telephone;
            this.image = data.image;
            this.postByUser = data.Posts;
          } else {
            this.prenom = data.prenom;
            this.nom = data.nom;
            this.email = data.email;
            this.telephone = data.telephone;
            this.postByUser = [];
          }
        },
        error: error => {
          this.errorServeur = error.message;
        }
      })
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  gotoMail() {
    this.mailTo = 'mailto:' + this.email;
    window.location.href = this.mailTo;
  }

  gotoTel() {
    this.telTo = 'tel:' + this.telephone
    window.location.href = this.telTo;
  }
}