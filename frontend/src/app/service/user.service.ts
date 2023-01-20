import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { User } from '../pages/models/User.models';
import { apiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/users').pipe(map(result => {
      return result;
    }));
  }

  getUser(userId :number) :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`).pipe(map(result => {
      return result;
    }));
  }

  getPostByUser(userId :number) :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}` + '/posts').pipe(map(result => {
      return result;
    }));
  }

  updateUser(userId :number, user: User, image? :File) :Observable<any> {
    const userData = new FormData();
    userData.append('user', JSON.stringify(user));
    if(image) {
      userData.append('image', image);
    }
    return this.http.put<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`, userData).pipe(map(result => {
      return result;
    }));
  }

  // Ne fonction pas
  deleteUser(userId :number) :Observable<any> {
    return this.http.delete<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`).pipe(map(result => {
      return result;
    }));
  }
}