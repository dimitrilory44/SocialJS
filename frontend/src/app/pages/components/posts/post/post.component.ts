import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CommentsBottomComponent } from '../../comments/comment-bottom/comments-bottom.component';
import { Like } from '../../../models/Like.models';
import { Post } from '../../../models/Post.models';
import { User } from '../../../models/User.models';
import { UpdatePostComponent } from '../post-update/post-update.component';
import { PostService } from '../../../../service/post.service';
import { Router } from '@angular/router';
import { Comment } from '../../../models/Comment.models';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post ?:Post;
  @Input() userLink ?:User;
  @Input() author ?:User;
  @Input() commentsPost ?:Comment[] = [];
  @Input() likes ?:Like[] = [];
  @Input() isPost ?: boolean;
  @Input() errorMessage ?:string = '';

  @Output() change = new EventEmitter();

  subscription$Delete ?:Subscription;
  subscription$ ?:Subscription;
  likesCount: number | boolean;
  isActive: boolean;
  isComment :boolean = false;
  color :string;
  likeList :string = '';
  id :number;
  isLike :boolean = false;

  like :boolean;

  user :User;

  likePost :FormGroup;
  tableauString :string[] = [];

  constructor(
    private _apiService: PostService,
    private _routes :Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.post.Like_posts.forEach((element:any) => {
      if(element.User['id'] == this.user.userId) {
        this.like = element.isLike;
      }
    })
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
    this.subscription$Delete?.unsubscribe();
  }

  openDialog(post :Post) {
    const dialogRef = this._dialog.open(UpdatePostComponent, {
      data : post,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deletePost(id: number) {
    this.subscription$Delete = this._apiService.deletePost(id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'Close');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  openBottomSheet(id: number): void {
    this._bottomSheet.open(CommentsBottomComponent, {
      data: id
    });
  }

  onLike(id: number) {
    if(this.like) {
      this.likesCount = 0;
    } else {
      this.likesCount = 1;
    }
    this.isActive = !this.isActive;

    const my_like = new Like();
    my_like.like = this.likesCount;
    my_like.userId = this.user.userId;

    // Liké un post
    console.log(my_like);
    console.log(id);

    this._apiService.likePost(id, my_like).subscribe({
      next: result => {
        console.log(result.message);
        location.reload();
      },
      error: error => {
        console.log(error.error.error);
      }
    })

    // Affichage colorisé like ou non
    if(this.like) {
      this.color = '#0d8bf0';
      console.log(this.likesCount);
    } else {
      this.color = 'grey';
      console.log(this.likesCount);
    }
	}

  getLikes(id :number) {
    this.likeList = '';
    this.tableauString = [];
    this._apiService.getLikes(id).subscribe({
      next: result => {
        for(let i = 0; i < result.length ; i++) {
          this.tableauString[i] = result[i].User.nom + ' ' + result[i].User.prenom;
          this.likeList = this.tableauString.join('\n');
        }
      },
      error: error => {
        this.errorMessage = error.error.error;
        console.log(error.error.error);
      }
    });
  }

  showPost(id :number) {
    this._routes.navigate(['/posts', id]);
    this.change.emit(id);
  }

  showComment() {
    this.isComment = !this.isComment;
  }
}