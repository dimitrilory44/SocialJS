import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/Post.models';
import { PostService } from '../../service/post.service';
import { mimeType } from './mime-type.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from '../models/User.models';
import { Like } from '../models/Like.models';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  createPostSubscription$ :Subscription;
  subscription$ ?:Subscription;
  posts ?:Post[];
  likes ?:Like[];
  file?: File;
  url ?:string;
  errorMessage ?:string = '';
  errorServeur ?:string = '';
  
  my_user :User;
  user :User;
  image :string = '';
  imagePost :string = '';

  createPost :FormGroup;

  constructor(
    private _apiService: PostService,
    private _userService: UserService,
    private _formBuilder :FormBuilder,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        console.log(result);
        this.my_user = result;
        this.image = this.my_user.image;
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    })

    console.log(this.user.userId);

    this.subscription$ = this._apiService.getPosts().subscribe({
      next: data => {
        this.posts = data;
        console.log(this.posts);
      },
      error: error => {
        this.errorServeur = error.message;
        console.log(error.message);
      }
    });

    this.createPost = this._formBuilder.group({
      titre : ['post_image', Validators.required],
      contenu : ['', Validators.required],
      image: [null, Validators.required, mimeType],
      UserId: this.user.userId
    });

  }

  ngOnDestroy() :void {
    this.createPostSubscription$?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSelectFile(e :any) {
    if(e.target.files && e.target.files[0]){      
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.url = reader.result as string;
      }
      this.file = e.target.files[0];
      this.createPost.get('image').updateValueAndValidity();
    }
  }

  onSubmit() {
    const post = new Post();
    post.titre = this.createPost.get('titre').value;
    post.contenu = this.createPost.get('contenu').value;
    post.image = '';
    post.UserId = this.createPost.get('UserId').value;

    this._apiService.createPost(post, this.file).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }
}