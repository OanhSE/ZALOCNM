import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public uservalue: User ;
  public url = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(this.uservalue);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;

  }

  // tslint:disable-next-line:typedef
  login(phone , password) {
    // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { phone, password })
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.userSubject.next(user);
    //     return user;
    //   }));

    return this.http.post<User>( this.url + 'users/authenticate?phone=' + phone + '&password=' + password , this.uservalue)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));

  }


  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }
  // tslint:disable-next-line:typedef
  tranferAccount() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/register']);
  }

  // tslint:disable-next-line:typedef
  register(user: User) {
  //  return this.http.post(`${environment.apiUrl}/users/register`, user);
    return this.http.post(this.url + 'saveUser', user);
  }

  // tslint:disable-next-line:typedef
  getAll() {
   // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    return this.http.get<User[]>(this.url + 'getUsers');
  }

  // tslint:disable-next-line:typedef
  getById(id: string) {
  //  return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    return this.http.get<User>(this.url  + `getUsers/${id}`);
  }
  // tslint:disable-next-line:typedef
  getByPhone(phone: string) {

    // return this.http.get<User>(`${environment.apiUrl}/up/${phone}`);
    return this.http.get<User>(this.url + '/getUser/phone?phone=' + phone);
  }

  // tslint:disable-next-line:typedef
  update( params: User) {
    return this.http.put(this.url + 'editUser', params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        // tslint:disable-next-line:triple-equals
        if (params.id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  // tslint:disable-next-line:typedef
  delete(id: string) {
    return this.http.delete(this.url  + `deleteUser`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        // tslint:disable-next-line:triple-equals
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }
}

// private base_Url = "Newtech20Module1-env.eba-2mxedsfk.ap-southeast-1.elasticbeanstalk.com/"
  //
  // public getAll(){
  //   return this.httpClient.get(this.base_Url + "getUsers");
  // }
  //
  // public getUserById(id: string){
  //   return this.httpClient.get(this.base_Url + "getUsers/" + id);
  // }
  //
  // public createUser(user: User){
  //   return this.httpClient.post(this.base_Url + "saveUser", user);
  // }
  //
  // public update(user: User){
  //   return this.httpClient.put(this.base_Url + "editUser", user);
  // }
  //
  // public delete(user: User){
  //   return this.httpClient.delete(this.base_Url + "deleteUser");
  // }
  //
  // public getUserByPhone(phone: string){
  //   return this.httpClient.get(this.base_Url + "getUser/phone?phone=" + phone);
  // }
  //
  // public getUserByName(name: string){
  //   return this.httpClient.get(this.base_Url + "getUser/name?name=" + name);
  // }


