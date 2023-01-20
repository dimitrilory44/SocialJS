import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { WebSocketService } from 'src/app/_services/web-socket.service';
import { Comment } from '../../../models/Comment.models';
import { User } from '../../../models/User.models';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html'
})
export class NewCommentComponent implements OnInit {

  @Input() data :number;
  @Input() findUser :User;

  createComment :FormGroup;
  user :User;

  commentTemp ?: any;

  constructor(
    private _webService :WebSocketService,
    private _apiService :PostService,
    private _snackBar: MatSnackBar,
    private _formBuilder :FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.createComment = this._formBuilder.group({
      contenu : ['', Validators.required],
      UserId: this.user.userId
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmitComment() {
    console.log(this.createComment.value);

    const comment = new Comment();
    comment.contenu = this.createComment.get('contenu').value;
    comment.UserId = this.createComment.get('UserId').value;

    const commentTemp = {
      "contenu": this.createComment.get('contenu').value,
      "PostId": this.data,
      "image": this.findUser.image,
      "nom": this.user.nom,
      "prenom": this.user.prenom,
      "createdAt": new Date()
    }

    console.log(comment);
    this._webService.sendMessage(commentTemp);

    this._apiService.createComment(this.data, comment).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        setTimeout(function(){ 
          location.reload();
        }, 1500);
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

}
