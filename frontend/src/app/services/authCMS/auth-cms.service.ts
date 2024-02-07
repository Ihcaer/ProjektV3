import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCMSService {
  private accessTokenSubject: BehaviorSubject<string | null>;
  czasAutoWylogowania = 120000;
  czasNieWylogowania = 36000000;
  baseUrl = 'http://localhost:3000/cms';
  cmsLoginUrl = '/login';
  cmsRegisterUrl = '/register';

  constructor(private http: HttpClient, private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<string | null>(this.getStoredAccessToken());
  }

  get accessToken$(): Observable<string | null> {
    return this.accessTokenSubject.asObservable();
  }

  setAccessToken(token: string, nieWylogowuj: boolean): void {
    localStorage.setItem('accessToken', token);
    const expirationTime = nieWylogowuj ? new Date().getTime() + (this.czasNieWylogowania) : new Date().getTime() + (this.czasAutoWylogowania);
    localStorage.setItem('expirationTime', expirationTime.toString());
    this.accessTokenSubject.next(token);
  }

  private getStoredAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessToken');
    } else {
      return null;
    }
  }

  autoLogout(): void {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (parseInt(expirationTime) <= currentTime) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
      }
    }
  }

  registerCMS(credentials: { imie: string, login: string, uprawnienia: number, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.cmsRegisterUrl}`, credentials);
  }

  loginCMS(credentials: { login: string; haslo: string }, nieWylogowuj: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.cmsLoginUrl}`, credentials)
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            this.setAccessToken(response.accessToken, nieWylogowuj);
            this.router.navigate(['/cms/aktualnosci']);
          }
        })
      );
  }

  isEmployeeLoggedIn(): Observable<boolean> {
    const token = this.getStoredAccessToken();
    return of(!!token);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/cms/login']);
  }
}