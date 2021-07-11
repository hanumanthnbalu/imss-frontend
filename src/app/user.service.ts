import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/user';
  private isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getDevelopers() {
    return this.http.get(this.apiUrl + '?role=DEVELOPER')
      .pipe(tap(res => console.log('fetched developers', res)),
        catchError(this.handleError('developers', []))
      );
  }

  addDeveloper(bodyData) {
    return this.http.post(this.apiUrl, bodyData)
      .pipe(tap(res => console.log('add developer', res)),
        catchError(this.handleError('addDeveloper', []))
      );
  }

  login(bodyData) {
    return this.http.post(this.apiUrl + '/login', bodyData)
      .pipe(tap((res: any) => {
        localStorage.setItem('IMSS', res.token);
        localStorage.setItem('USER', JSON.stringify(res.user));
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        this.router.navigate(['/']);
      }),
        catchError(this.handleError('login Developer', []))
      );
  }

  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    localStorage.removeItem('IMSS');
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

  autoAuthUser() {
    const authInforamtion = this.getAuthData();
    console.log(authInforamtion)
    if (!authInforamtion) return;
    this.isAuthenticated = true;
    this.authStatusListner.next(true);
    // this.authInfoListner.next();
  }

  getAuthInfo() {
    const user = localStorage.getItem('USER');
    return JSON.parse(user);
  }


  getAuthData() {
    const user = JSON.parse(localStorage.getItem('USER'));
    const token = localStorage.getItem('IMSS');
    if (user && token) {
      return {
        token: token,
        user: user,
      };
    }
  }
  getToken() {
    return localStorage.getItem("IMSS");
  }

  getIsAuth() {
    const user = localStorage.getItem('USER');
    const token = localStorage.getItem("IMSS");
    if (!user && !token) {
      this.router.navigate(['/login']);
      return;
    } else {
      return { isAuthenticated: this.isAuthenticated, user: JSON.parse(user) };
    }
  }



  private handleError(operation = 'operation', result) {
    return (error: any) => {
      alert(error.error.message);
      return of(result);
    };
  }
}
