import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProfilComponent } from './profil/profil.component';
import { PostListPageComponent } from './post-list-page/post-list-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'profil/:id', component: PostListPageComponent, canActivate: [AuthGuard]},
  { path: 'posts/:id', component: PostPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class PagesRoutingModule { }
