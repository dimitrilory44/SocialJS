import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { apiResponse } from '../_models/apiResponse';
import { LoginForm } from '../_models/login.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isLogged():boolean{
    let token = localStorage.getItem("token");
    if(token === null) {
      return false;
    } else {
      return true;
    }
  }
  
  checkAdmin() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/auth').pipe(map(result => {
      return result;
    }));
  }

  register(user: any) :Observable<any> {
    return this.http.post<apiResponse>(Constants.BASE_URL + '/auth/signup', user).pipe(map(result => {
      return result;
    }));
  }

  login(user: LoginForm) {
    let newBody = {'email': user.email, 'password': user.password};

    return this.http.post<apiResponse>(Constants.BASE_URL + '/auth/login', newBody).pipe(map(result => {
      return result;
    }))
  }

  logout() {
    localStorage.setItem('currentUser', null);
    localStorage.removeItem("token");
  }
}