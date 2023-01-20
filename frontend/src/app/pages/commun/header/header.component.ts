import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserListComponent } from '../../components/users/user-list/user-list.component';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() change = new EventEmitter();

  userHeader :User;
  user :User;
  image :string = '';
  width :number;
  isSearch :boolean = true;
  isClick :boolean = true;

  userSearch :FormGroup;

  myControl = new FormControl();
  users :any[] = [];
  filteredOptions: Observable<any[]>;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
    private _routes: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userHeader = JSON.parse(localStorage.getItem('currentUser'));

    if (this._routes.url.startsWith("/profil") || this._routes.url.startsWith("/posts")) {
      this.isSearch = false;
      this.isClick = false;        
    }

    this.width = window.innerWidth;

    this._userService.getUser(this.userHeader.userId).subscribe({
      next: result => {
        this.user = result;
        this.image = this.user.image;
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    });

    this._userService.getUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: error => {
        console.log(error.message);
      }
    })   

    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(prenom => prenom ? this._filter(prenom) : this.users.slice())
    );
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(UserListComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFn(user: any): string {
    return user && user.prenom ? user.prenom : '';
  }

  private _filter(prenom: string): any[] {
    const filterValue = prenom.toLowerCase();

    return this.users.filter(user => user.prenom.toLowerCase().includes(filterValue));
  }

  goToprofil(event :any, id :number) {
    event.preventDefault();
    this._routes.navigate(['/profil', id]);
    this.change.emit(id);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}