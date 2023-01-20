import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/pages/models/Comment.models';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../models/User.models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments-bottom.component.html',
  styleUrls: ['./comments-bottom.component.scss']
})
export class CommentsBottomComponent implements OnInit, OnDestroy {

  subscription$ ?:Subscription;
  subscriptionComments$ ?:Subscription;
  errorMessage ?:string;
  commentList ?:Comment[];

  user :User;
  my_user :User;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _userService :UserService,
    private _apiService :PostService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.subscriptionComments$ = this._apiService.getComments(this.data).subscribe(res => {
      this.commentList = res;
    });

    this.subscription$ = this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        this.my_user = result;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.subscriptionComments$.unsubscribe();
  }
}