import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'angular-10-registration-login-example-users';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
const contactkey = 'ngular-10-registration-login-example-contacts';
const contacts = JSON.parse(localStorage.getItem(contactkey)) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

      // tslint:disable-next-line:typedef
        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/up\/\d+$/) && method === 'GET':
                    return getUserByPhone();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.endsWith('/contacts/addcontact') && method === 'POST':
                    return addcontact();
                case url.match(/\/contacts\/\d+$/) && method === 'GET':
                    return  getContactsByContactIdUser();
                // case url.match(/\/contacts\/\d+$/) && method === 'GET':
                //     return getContactById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

      // tslint:disable-next-line:typedef
        function authenticate() {
            const { phone, password } = body;
            const user = users.find(x => x.phone === phone && x.password === password);
            if (!user) { return error('Sai số điện thoại hoặc mật khẩu'); }
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            });
        }

      // tslint:disable-next-line:typedef
        function register() {
            const user = body;

            if (users.find(x => x.phone === user.phone)) {
                return error('Số điện thoại "' + user.phone + '" đã có sẵn');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

      // tslint:disable-next-line:typedef
        function getUsers() {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users.map(x => basicDetails(x)));
        }

      // tslint:disable-next-line:typedef
        function getUserById() {
            if (!isLoggedIn()) { return unauthorized(); }
            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

      // tslint:disable-next-line:typedef
        function getUserByPhone() {
          if (!isLoggedIn()) { return unauthorized(); }
          const user = users.find(x => x.phone === idFromUrl2());
          console.log(idFromUrl2());
          if (user) {
            return ok(basicDetails(user));
          }
          return error('Số điện thoại chưa tồn tại');

      }

      // tslint:disable-next-line:typedef
        function updateUser() {
            if (!isLoggedIn()) { return unauthorized(); }

            const params = body;
            const user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }
            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

      // tslint:disable-next-line:typedef
        function deleteUser() {
            if (!isLoggedIn()) { return unauthorized(); }

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions

      // tslint:disable-next-line:typedef no-shadowed-variable
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

      // tslint:disable-next-line:typedef
        function error(message) {
            return throwError({ error: { message } })
              // tslint:disable-next-line:max-line-length
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

      // tslint:disable-next-line:typedef
        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

      // tslint:disable-next-line:typedef
        function basicDetails(user) {
            const { id, firstName, lastName, phone, birthday, sex, username, password} = user;
            return { id, firstName, lastName, phone, birthday, sex, username, password};
        }

      // tslint:disable-next-line:typedef
        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

      // tslint:disable-next-line:typedef
        function idFromUrl() {
            const urlParts = url.split('/');
          // tslint:disable-next-line:radix
            return parseInt(urlParts[urlParts.length - 1]);
        }
      // tslint:disable-next-line:typedef
        function idFromUrl2() {
        const urlParts = url.split('/');
        // tslint:disable-next-line:radix
        return urlParts[urlParts.length - 1];
       }
      // tslint:disable-next-line:typedef
        function addcontact() {
        const contact = body;

        if (contacts.find(x => x.iduser === contact.iduser && x.iduserdirectory === contact.iduserdirectory)) {
          return error('đã thêm bạn bè');
        }

        contact.id = contacts.length ? Math.max(...contacts.map(x => x.id)) + 1 : 1;
        contacts.push(contact);
        localStorage.setItem(contactkey, JSON.stringify(contacts));
        console.log('đang add');
        return ok();
      }
      // tslint:disable-next-line:typedef
        function getContactsByContactIdUser() {

        const listcontact = contacts.find(x => x.iduser === idFromUrl());


        if (!isLoggedIn()) { return error('không có danh sách'); }
        return ok(listcontact.map(x => basicDetails(x)));
      }
      // tslint:disable-next-line:typedef
        function getContactById() {
        if (!isLoggedIn()) { return unauthorized(); }

        const contact = contacts.find(x => x.id === idFromUrl());
        return ok(basicDetails(contact));
      }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
