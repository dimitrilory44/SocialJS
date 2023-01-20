import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../models/User.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../components/users/user-update/user-update.component';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  @Output() change = new EventEmitter();

  user :User;
  userSouscription$ :Subscription;
  deleteSouscription$ :Subscription;
  filename :string;
  image :string = '';
  telephone :string = '';
  email :string = '';
  file: File;
  my_user :User;
  mailTo :string = '';
  telTo :string = '';

  errorServeur ?:string = '';
  errorMessage ?:string = '';

  constructor(
    private _routes :Router,
    private _userService :UserService,
    private _authService :AuthService,
    private _snackBar :MatSnackBar,
    private _dialog :MatDialog
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.userSouscription$ = this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        this.my_user = result;
        this.image = this.my_user.image;
        this.telephone = this.my_user.telephone;
        this.email = this.my_user.email;

      },
      error: error => {
        this.errorServeur = error.message;
        console.log(error.error);
      }
    })
  }
  
  ngOnDestroy() {
    this.userSouscription$.unsubscribe();
    this.deleteSouscription$?.unsubscribe();
  }

  gotoMail() {
    this.mailTo = 'mailto:' + this.email;
    window.location.href = this.mailTo;
  }

  gotoTel() {
    this.telTo = 'tel:' + this.telephone;
    window.location.href = this.telTo;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  deleteUser(id: number) {
    this.deleteSouscription$ = this._userService.deleteUser(id).subscribe({
      next: result => {
        this._authService.logout();
        this._routes.navigate(['/login']);
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    })
  }

  openDialog(user :User): void {
    const dialogRef = this._dialog.open(UserUpdateComponent, {
      data: user,
      width: '520px',
      height: '520px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showPost(event :any, id: number) {
    event.preventDefault();
    this._routes.navigate(['/profil', id]);
    this.change.emit(id);
  }
}