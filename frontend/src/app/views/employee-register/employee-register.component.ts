import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';
import { KodWeryfikacyjnyDialogComponent } from '../../components/kod-weryfikacyjny-dialog/kod-weryfikacyjny-dialog.component';

export interface DialogData {
  kodWeryfikacyjny: number;
}

@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.scss'
})
export class EmployeeRegisterComponent {
  creatingEmployee: FormGroup;
  sum = 0;

  constructor(private ce: FormBuilder, public dialog: MatDialog, private router: Router, private cmsAuthService: AuthCMSService) {
    this.creatingEmployee = this.ce.group({
      imie: ['', [Validators.required]],
      nazwisko: [''],
      checkboxMojeArtykuly: [],
      checkboxWszystkieArtykuly: [],
      checkboxOfertyFranczyz: [],
      checkboxUzytkownicy: [],
      checkboxPrzedstawiciele: [],
      checkboxPracownicy: [],
    }, { validator: this.checkboxValidator });

    this.creatingEmployee.valueChanges.subscribe((value) => {
      this.sum = (value.checkboxMojeArtykuly ? 1 : 0) + (value.checkboxWszystkieArtykuly ? 2 : 0) + (value.checkboxOfertyFranczyz ? 4 : 0) + (value.checkboxUzytkownicy ? 15 : 0) +
        (value.checkboxPrzedstawiciele ? 30 : 0) + (value.checkboxPracownicy ? 60 : 0);
    });
  }

  checkboxValidator(checkboxValidators: FormGroup) {
    const checkboxes = [
      checkboxValidators.controls['checkboxMojeArtykuly'].value,
      checkboxValidators.controls['checkboxWszystkieArtykuly'].value,
      checkboxValidators.controls['checkboxOfertyFranczyz'].value,
      checkboxValidators.controls['checkboxUzytkownicy'].value,
      checkboxValidators.controls['checkboxPrzedstawiciele'].value,
      checkboxValidators.controls['checkboxPracownicy'].value
    ];

    if (checkboxes.reduce((prev, curr) => prev || curr, false)) {
      return null;
    } else {
      return { checkboxesInvalid: true };
    }
  }

  dodajPracownika() {
    if (this.creatingEmployee.valid) {
      const credentials = this.creatingEmployee.value;
      this.cmsAuthService.generateUniqueCode().subscribe(
        (kodWeryfikacyjny: number) => {
          credentials.uprawnienia = this.sum;
          credentials.kodWeryfikacyjny = kodWeryfikacyjny;

          this.cmsAuthService.creatingEmployee(credentials).pipe(
            tap((response) => {
              console.log(response);
              //alert("Kod weryfikacyjny: " + kodWeryfikacyjny);
              const employeeRegisterDialogConfig = new MatDialogConfig();
              employeeRegisterDialogConfig.data = { kodWeryfikacyjny: kodWeryfikacyjny };
              employeeRegisterDialogConfig.width = '250px';
              employeeRegisterDialogConfig.disableClose = true;
              let dialogRef = this.dialog.open(KodWeryfikacyjnyDialogComponent, employeeRegisterDialogConfig);
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/cms/logged/pracownicy']);
              });
            }),
            catchError((error: any) => {
              if (error.status) {
                if (error.status === 500) {
                  console.error("Błąd serwera", error);
                }
              }
              return of(error);
            })
          ).subscribe();
          /*this.cmsAuthService.creatingEmployee(credentials).subscribe(response => {
            console.log(response);
            alert("Kod weryfikacyjny: " + kodWeryfikacyjny);
          });*/
        }
      );
    }
  }
}