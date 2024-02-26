import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';

import { EmployeesTableService } from '../../services/employeesTable/employees-table.service';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

import { UsuwaniePracownikaDialogComponent } from '../../components/usuwanie-pracownika-dialog/usuwanie-pracownika-dialog.component';

@Component({
  selector: 'app-pracownicy',
  standalone: true,
  imports: [CommonModule, MatIcon, MatTooltipModule, MatDialogModule],
  templateUrl: './pracownicy.component.html',
  styleUrl: './pracownicy.component.scss'
})
export class PracownicyComponent implements OnInit {
  employees: any[] = [];

  /*permissionsIcons: { [key: number]: string[] } = {
    1: ['news'],
    2: ['rule'],
    4: ['price_change'],
    15: ['user_attributes'],
    30: ['co_present'],
    60: ['settings_account_box'],
  };*/

  /*uprawnienia1 = [1, 3, 5, 7, 16, 18, 20, 31, 35, 46, 61, 65, 66, 76, 91, 112];
  uprawnienia2 = [2, 3, 6, 7, 17, 18, 21, 32, 33, 36, 47, 62, 63, 66, 77, 92, 112];
  uprawnienia3 = [5, 6, 7, 19, 20, 21, 34, 35, 36, 49, 64, 65, 66, 79, 94, 112];
  uprawnienia4 = [16, 17, 18, 19, 20, 21, 45, 46, 47, 49, 75, 76, 77, 79, 105, 112];
  uprawnienia5 = [31, 32, 33, 34, 35, 36, 45, 46, 47, 49, 90, 91, 92, 94, 105, 112];
  uprawnienia6 = [61, 62, 63, 64, 65, 66, 75, 76, 77, 79, 90, 91, 92, 94, 105, 112];*/

  constructor(private employeesTableService: EmployeesTableService, private router: Router, private cdr: ChangeDetectorRef, public dialog: MatDialog, private cmsAuthService: AuthCMSService) { }

  ngOnInit(): void {
    this.employeesTableService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  navigateToEmployeeRegister() {
    this.router.navigate(['/cms/logged/employeeRegister']);
  }

  navigateToEmployeeSettings(id: number) {
    this.router.navigate(['/cms/logged/employeeEdit', id]);
  }

  deleteEmployee(id: number): void {
    const employeeDelDialogConfig = new MatDialogConfig();
    employeeDelDialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(UsuwaniePracownikaDialogComponent, employeeDelDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesTableService.deleteEmployee(id).subscribe(() => {
          this.employees = this.employees.filter(employee => employee.id !== id);
          this.cdr.detectChanges();
        });
      } else {
        return;
      }
    })
  }
}
