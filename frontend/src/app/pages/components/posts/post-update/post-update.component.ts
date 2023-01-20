import { Component, OnInit, Inject, AfterContentInit, OnDestroy, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/Post.models';
import { PostService } from '../../../../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class UpdatePostComponent implements OnInit, AfterContentInit, OnDestroy {

  subscription$ ?:Subscription;
  post ?:Post;
  errorMessage ?:string;

  updatePost :FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private _formBuilder :FormBuilder,
    private _apiService :PostService,
    private _snackBar :MatSnackBar
  ) { }
 
  ngOnInit() {
    this.post = this.data;
  
    this.updatePost = this._formBuilder.group({
      contenu : ['', Validators.required],
      image: [null, Validators.required]
    });
  }
  
  ngAfterContentInit() {
    this.updatePost.controls.contenu.setValue(this.post.contenu);
    this.updatePost.controls.image.setValue(this.post.image);
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmitUpdate() {
    console.log(this.updatePost.value);

    let post = new Post();
    post.contenu = this.updatePost.get('contenu').value;
    post.image = this.updatePost.get('image').value;

    this.subscription$ = this._apiService.updatePost(this.post.id, post).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        location.reload();
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    })
  }
}