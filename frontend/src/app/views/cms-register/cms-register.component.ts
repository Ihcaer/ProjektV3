import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

@Component({
  selector: 'app-cms-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cms-register.component.html',
  styleUrl: './cms-register.component.scss'
})
export class CmsRegisterComponent {
  registerCMS: FormGroup;

  constructor(private lc: FormBuilder, private CMSAuthService: AuthCMSService) {
    this.registerCMS = this.lc.group({
      login: ['', [Validators.required]],
      haslo: ['', [Validators.required]]
    });
  }

  zarejestruj() {
    const credentials = this.registerCMS.value;
    if (this.registerCMS.valid) {
      /*this.CMSAuthService.registerCMS(credentials).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          if (error.status) {
            if (error.status === 400) {
              console.error("Podany login już istnieje", error);
            } else if (error.status === 500) {
              console.error("Błąd serwera", error);
            }
          }
        }
      );*/
      this.CMSAuthService.registerCMS(credentials).pipe(
        tap((response) => {
          console.log(response);
        }),
        catchError((error) => {
          if (error.status) {
            if (error.status === 400) {
              console.error("Podany login już istnieje", error);
            } else if (error.status === 500) {
              console.error("Błąd serwera", error);
            }
          }
          return of(error);
        })
      ).subscribe();
    }
  }
}
