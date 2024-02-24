import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';
import { EmployeesTableService } from '../../services/employeesTable/employees-table.service';

@Component({
  selector: 'app-cms-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatStepperModule],
  templateUrl: './cms-register.component.html',
  styleUrl: './cms-register.component.scss'
})
export class CmsRegisterComponent {
  //registerCMS: FormGroup;
  //codeVerExists = false;

  firstFormGroup = this.fb.group({
    kodWeryfikacyjny: ['', [Validators.required, Validators.pattern('[0-9]+')]],
  });
  secondFormGroup = this.fb.group({
    login: ['', Validators.required],
    haslo: ['', Validators.required]
  });

  @ViewChild('stepper') stepper?: MatStepper;

  constructor(private fb: FormBuilder, private router: Router, private CMSAuthService: AuthCMSService, private employeeService: EmployeesTableService) {
    /*this.registerCMS = this.lc.group({
      kodWeryfikacyjny: ['', [Validators.required]],
      login: ['', [Validators.required]],
      haslo: ['', [Validators.required]]
    });*/
  }

  checkVerCode() {
    const verCode = this.firstFormGroup.get('kodWeryfikacyjny')?.value ?? '';
    if (this.stepper) {
      this.employeeService.checkVerCode(verCode).subscribe(result => {
        //this.codeVerExists = result.exists;
        if (result.exists) {
          this.stepper?.next();
        } else {
          // Możesz wyświetlić komunikat, że dane nie istnieją
        }
      });
    }
  }

  zarejestruj() {
    if (this.secondFormGroup) {
      const loginControl = this.secondFormGroup.get('login');
      const hasloControl = this.secondFormGroup.get('haslo');
      const verCodeAcc = this.firstFormGroup.get('kodWeryfikacyjny')

      if (loginControl && hasloControl && loginControl.value !== null && hasloControl.value !== null && verCodeAcc && verCodeAcc.value !== null) {
        const credentials = {
          login: loginControl.value,
          haslo: hasloControl.value,
          kodWeryfikacyjny: verCodeAcc.value
        };

        if (this.secondFormGroup.valid) {
          this.CMSAuthService.registerCMS(credentials).pipe(
            tap((response) => {
              console.log(response);
              this.router.navigate(['/cms/login']);
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
      } else {
        console.error('Wartość login lub hasło jest null');
      }
    } else {
      console.error('Formularz nie został prawidłowo zainicjowany');
    }
  }

  /*zarejestruj() {
    const credentials = this.registerCMS.value;
    if (this.registerCMS.valid) {
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
  }*/
}
