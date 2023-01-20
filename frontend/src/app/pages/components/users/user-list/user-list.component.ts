import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @Output() change = new EventEmitter();
  
  subscription$ :Subscription;
  subscriptionDelete$ :Subscription;
  users ?:any[];

  constructor(
    private _userService :UserService,
    private _snackBar :MatSnackBar,
    private _routes :Router
  ) { }

  ngOnInit(): void {

    // Service pour récupérer tous les utilisateurs
    this.subscription$ = this._userService.getUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: error => {
        console.log(error.message);
      }
    })
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
    this.subscriptionDelete$?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  gotoprofil(event: any, id: number) {
    event.preventDefault();
    this._routes.navigate(['/profil', id]);
    this.change.emit(id);
  }

  deleteUser(id :number) {
    this.subscriptionDelete$ = this._userService.deleteUser(id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }
}
