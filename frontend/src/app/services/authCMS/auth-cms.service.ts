import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCMSService {
  private baseUrl = 'http://localhost:3000';
  private cmsLoginUrl = '/cms/login';
  private cmsCreatingEmployeeUrl = '/cms/creatingEmployee';
  private checkCodeUniqUrl = '/cms/checkCodeUniq';
  private generateUniqueCodeUrl = '/cms/generateUniqueCode'
  private cmsRegisterUrl = '/cms/register';

  private accessTokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<string | null>(this.getStoredAccessToken());
    if (typeof localStorage !== 'undefined') {
      const expirationTimeString = localStorage.getItem('expirationTime');
      const nieWylogowuj = localStorage.getItem('nieWylogowuj') === 'true';
      this.initSessionTimeout(expirationTimeString, nieWylogowuj);
      this.initLogoutOnUnload();
    }
  }

  get accessToken$(): Observable<string | null> {
    return this.accessTokenSubject.asObservable();
  }

  setAccessToken(token: string, nieWylogowuj: boolean): void {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('nieWylogowuj', String(nieWylogowuj));
    const expiresIn = nieWylogowuj ? '30d' : '7h';
    const expirationTime = new Date().getTime() + this.parseExpirationTime(expiresIn);
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

  private initSessionTimeout(expirationTimeString: string | null, nieWylogowuj: boolean): void {
    if (expirationTimeString && !nieWylogowuj) {
      const expirationTime = +expirationTimeString;
      const expiresIn = expirationTime - new Date().getTime();
      if (expiresIn > 0) {
        setTimeout(() => {
          this.logout();
        }, expiresIn);
      } else {
        this.logout();
      }
    }
  }

  private initLogoutOnUnload(): void {
    window.addEventListener('beforeunload', () => {
      const nieWylogowujValue = localStorage.getItem('nieWylogowuj');
      if (nieWylogowujValue === 'false') {
        this.logout();
      }
    });
  }
  private parseExpirationTime(expiresIn: string): number {
    const units: { [key: string]: number } = {
      'ms': 1,
      's': 1000,
      'm': 60 * 1000,
      'h': 60 * 60 * 1000,
      'd': 24 * 60 * 60 * 1000
    };
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (match && match.length === 3) {
      return parseInt(match[1]) * units[match[2]];
    }
    return 0;
  }

  // guard
  isEmployeeLoggedIn(): Observable<boolean> {
    const token = this.getStoredAccessToken();
    return of(!!token);
  }

  // wywoływane
  creatingEmployee(credentials: { imie: string, nazwisko: string, uprawnienia: number, kodWeryfikacyjny: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.cmsCreatingEmployeeUrl}`, credentials);
  }
  checkCodeUniq(kodWeryfikacyjny: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}${this.checkCodeUniqUrl}/${kodWeryfikacyjny}`);
  }
  generateUniqueCode(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}${this.generateUniqueCodeUrl}`);
  }

  registerCMS(credentials: { login: string, haslo: string, kodWeryfikacyjny: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.cmsRegisterUrl}`, credentials);
  }

  loginCMS(credentials: { login: string; haslo: string }, nieWylogowuj: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.cmsLoginUrl}`, credentials)
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            this.setAccessToken(response.accessToken, nieWylogowuj);
            this.router.navigate(['/cms/logged/aktualnosci']);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    this.accessTokenSubject.next(null);
    this.router.navigate(['/cms/login']);
  }
}
