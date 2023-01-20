import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './page-routing.module';
import { AppMaterialModule } from '../app-material.module';

import { HeaderComponent } from './commun/header/header.component';
import { FooterComponent } from './commun/footer/footer.component';

import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostListPageComponent } from './post-list-page/post-list-page.component';

import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostComponent } from './components/posts/post/post.component';
import { UpdatePostComponent } from './components/posts/post-update/post-update.component';

import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';

import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { NewCommentComponent } from './components/comments/new-comment/new-comment.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsBottomComponent } from './components/comments/comment-bottom/comments-bottom.component';

import { ErreurClientComponent } from '../error/pages/erreur-client/erreur-client.component';
import { ErreurServeurComponent } from '../error/pages/erreur-serveur/erreur-serveur.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CommentsBottomComponent,
    PostListComponent,
    UpdatePostComponent,
    ProfilComponent,
    PostComponent,
    PostPageComponent,
    PostListPageComponent,
    UserListComponent,
    UserUpdateComponent,
    CommentListComponent,
    NewCommentComponent,
    CommentComponent,
    ErreurServeurComponent,
    ErreurClientComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: []
})
export class PagesModule {}