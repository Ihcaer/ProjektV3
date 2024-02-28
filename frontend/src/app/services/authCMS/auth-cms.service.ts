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
  private additionalUrl = '/cms';
  private checkCodeUniqUrl = '/checkCodeUniq';
  private generateUniqueCodeUrl = '/generateUniqueCode'
  private cmsRegisterUrl = '/register';
  private cmsCreatingEmployeeUrl = '/creatingEmployee';
  private cmsLoginUrl = '/login';
  private permissionUrl = '/permission';
  private idUrl = '/getId';

  private frontendLoginUrl = '/cms/login';
  private frontendAktualnosciCms = '/cms/logged/aktualnosci';

  private accessTokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<string | null>(this.getStoredAccessToken());
    const expirationTimeString = this.getCookie('expirationTime');
    const nieWylogowuj = this.getCookie('nieWylogowuj') === 'true';
    this.initSessionTimeout(expirationTimeString, nieWylogowuj);
    this.initLogoutOnUnload();
  }

  get accessToken$(): Observable<string | null> {
    return this.accessTokenSubject.asObservable();
  }

  setAccessToken(token: string, nieWylogowuj: boolean): void {
    this.setCookie('accessToken', token);
    this.setCookie('nieWylogowuj', String(nieWylogowuj));
    const expiresIn = nieWylogowuj ? '30d' : '7h';
    const expirationTime = new Date().getTime() + this.parseExpirationTime(expiresIn);
    this.setCookie('expirationTime', expirationTime.toString());
    this.accessTokenSubject.next(token);
    this.router.navigate([this.frontendAktualnosciCms]);
  }

  private getStoredAccessToken(): string | null {
    return this.getCookie('accessToken');
  }

  private getCookie(name: string): string | null {
    if (typeof document !== 'undefined') {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  private setCookie(name: string, value: string): void {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=${value}`;
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
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        const nieWylogowujValue = this.getCookie('nieWylogowuj');
        if (nieWylogowujValue === 'false') {
          this.logout();
        }
      });
    }
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
    try {
      const token = this.getStoredAccessToken();
      return of(!!token);
    } catch (error) {
      console.error('Błąd podczas sprawdzania zalogowania:', error);
      return of(false);
    }
  }

  getPermission(): Observable<{ permissionNumber: number }> {
    return this.http.get<{ permissionNumber: number }>(this.baseUrl + this.additionalUrl + this.permissionUrl, { withCredentials: true });
  }

  // komponent
  getId(): Observable<{ id: number }> {
    return this.http.get<{ id: number }>(this.baseUrl + this.additionalUrl + this.idUrl, { withCredentials: true });
  }

  creatingEmployee(credentials: { imie: string, nazwisko: string, uprawnienia: number, kodWeryfikacyjny: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.additionalUrl}${this.cmsCreatingEmployeeUrl}`, credentials);
  }
  checkCodeUniq(kodWeryfikacyjny: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}${this.additionalUrl}${this.checkCodeUniqUrl}/${kodWeryfikacyjny}`);
  }
  generateUniqueCode(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}${this.additionalUrl}${this.generateUniqueCodeUrl}`);
  }

  registerCMS(credentials: { login: string, haslo: string, kodWeryfikacyjny: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.additionalUrl}${this.cmsRegisterUrl}`, credentials);
  }

  loginCMS(credentials: { login: string; haslo: string }, nieWylogowuj: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.additionalUrl}${this.cmsLoginUrl}`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            this.setAccessToken(response.accessToken, nieWylogowuj);
          }
        })
      );
  }

  logout(): void {
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'expirationTime=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'nieWylogowuj=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.accessTokenSubject.next(null);
    this.router.navigate([this.frontendLoginUrl]);
  }
}
