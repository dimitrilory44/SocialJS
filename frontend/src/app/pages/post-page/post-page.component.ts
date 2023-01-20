import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { Comment } from '../models/Comment.models';
import { Post } from '../models/Post.models';
import { User } from '../models/User.models';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  subscriptionUser$ :Subscription;
  subscriptionPost$ :Subscription;
  commentList ?:Comment[] = [];
  post ?:Post;
  id :number;
  user ?:User;
  my_user :User;
  image :string = '';
  isPost :boolean = false;
  lenght :number;

  errorServeur ?:string = '';
  errorMessage ?:string = '';

  constructor(
    private _routes :Router,
    private _activeRoute :ActivatedRoute,
    private _userService :UserService,
    private _apiService: PostService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this._routes.url.startsWith("/posts")) {
      this.isPost = true;        
    }

    this.subscriptionPost$ = this._activeRoute.paramMap.subscribe((res:any) => {
      this._apiService.getPost(res.get("id")).subscribe({
        next: data => {
          this.post = data;
          // Récupération de tous les commentaires associé au post
          this._apiService.getComments(this.post?.id).subscribe(res => {
            this.commentList = res;
          });
        },
        error: error => {
          this.errorServeur = error.message;
          console.log(error.message);
        }
      })
    });

    this.subscriptionUser$ = this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        this.my_user = result;
        this.image = this.my_user.image;
      },
      error: error => {
        this.errorServeur = error.message;
        console.log(error.error);
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionUser$.unsubscribe();
    this.subscriptionPost$.unsubscribe();
  }
}