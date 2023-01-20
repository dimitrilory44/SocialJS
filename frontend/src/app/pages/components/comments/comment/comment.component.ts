import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { Comment } from '../../../models/Comment.models';
import { User } from '../../../models/User.models';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  
  @Input() postId :number;
  @Input() comment :Comment;
  @Input() auteur :User;

  updateCommentaire :FormGroup;
  isComment :boolean = false;
  user :User;
  errorMessage :string = '';

  constructor(
    private _apiService :PostService,
    private _formBuilder :FormBuilder,
    private _snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.updateCommentaire = this._formBuilder.group({
      contenu: ['', Validators.required]
    });
  }

  deleteComment(id: number) {
    this._apiService.deleteComment(this.postId, id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        setTimeout(function(){ 
          location.reload();
        }, 1500);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  openComment(event :any, id: number) {
    event.preventDefault();
    this._apiService.getComment(this.postId, id).subscribe({
      next: result => {
        console.log(result);
        this.updateCommentaire.controls.contenu.setValue(result.contenu);
        this.isComment = !this.isComment;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

  updateComment(id: number) {
    const comment = new Comment();
    comment.contenu = this.updateCommentaire.get('contenu').value;

    this._apiService.updateComment(this.postId, id, comment).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        setTimeout(function(){ 
          location.reload();
        }, 1500);
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

}
