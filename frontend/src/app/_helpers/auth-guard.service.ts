import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
      private _router: Router, 
      private _authService: AuthService
  ) {}

  canActivate() {
    if(this._authService.isLogged()) {
      return true;
    } else {
      this._router.navigate(["/forbidden"]);
      // redirection vers une page qui va lui dire qu'il n'a pas les droits
      return false;
    }
  }
}
