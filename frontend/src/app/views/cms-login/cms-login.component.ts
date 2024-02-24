import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';
import { BladLogowaniaSnackbarComponent } from '../../components/blad-logowania-snackbar/blad-logowania-snackbar.component';

@Component({
  selector: 'app-cms-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cms-login.component.html',
  styleUrl: './cms-login.component.scss'
})
export class CmsLoginComponent implements OnInit {
  logowanieCMS: FormGroup;

  constructor(private lc: FormBuilder, private router: Router, private snackbar: MatSnackBar, private CMSAuthService: AuthCMSService) {
    this.logowanieCMS = this.lc.group({
      login: ['', [Validators.required]],
      haslo: ['', [Validators.required]],
      nieWylogowuj: [false]
    });
  }

  ngOnInit() {
    this.CMSAuthService.isEmployeeLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/cms/logged/aktualnosci']);
      }
    });
  }

  zaloguj() {
    if (this.logowanieCMS.valid) {
      const credentials = { login: this.logowanieCMS.value.login, haslo: this.logowanieCMS.value.haslo };
      const nieWylogowuj = this.logowanieCMS.value.nieWylogowuj;
      this.CMSAuthService.loginCMS(credentials, nieWylogowuj)
        .subscribe(response => {
          this.CMSAuthService.setAccessToken(response.accessToken, nieWylogowuj);
          //console.log("Zalogowano pomyślnie");
        }, error => {
          if (error.status === 404 || error.status === 401) {
            this.openSnackbar(0);
          } else {
            //console.error('Błąd podczas logowania:', error);
          }
        });
    } else {
      this.openSnackbar(1);
    }
  }

  openSnackbar(index: number) {
    this.snackbar.openFromComponent(BladLogowaniaSnackbarComponent, {
      data: { messageIndex: index },
      duration: 5000
    });
  }
}
