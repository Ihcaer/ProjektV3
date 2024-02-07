import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

@Component({
  selector: 'app-cms-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cms-login.component.html',
  styleUrl: './cms-login.component.scss'
})
export class CmsLoginComponent implements OnInit {
  logowanieCMS: FormGroup;

  constructor(private lc: FormBuilder, private router: Router, private CMSAuthService: AuthCMSService) {
    this.logowanieCMS = this.lc.group({
      login: ['', [Validators.required]],
      haslo: ['', [Validators.required]],
      nieWylogowuj: [false]
    });
  }

  ngOnInit() {
    this.CMSAuthService.isEmployeeLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/cms/aktualnosci']);
      }
    });
    /*if (this.logowanieCMS.invalid) {
      return;
    };*/
  }

  zaloguj() {
    if (this.logowanieCMS.valid) {
      const credentials = { login: this.logowanieCMS.value.login, haslo: this.logowanieCMS.value.haslo };
      const nieWylogowuj = this.logowanieCMS.value.nieWylogowuj;
      this.CMSAuthService.loginCMS(credentials, nieWylogowuj)
        .subscribe(response => {
          this.CMSAuthService.setAccessToken(response.accessToken, nieWylogowuj);
          console.log("Zalogowano pomyślnie");
        }, error => {
          if (error.status === 404) {
            console.log('Login nie istnieje.');
          } else if (error.status === 401) {
            console.log('Nieprawidłowe hasło.');
          } else {
            console.error('Błąd podczas logowania:', error);
          }
        });
    } else {
      console.log("Formularz nie może być pusty");
    }
  }
}
