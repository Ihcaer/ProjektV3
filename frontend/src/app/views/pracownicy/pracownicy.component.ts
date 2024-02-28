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

  permissionsIcons: string[] = ['feed', 'rule', 'price_change', 'people', 'co_present', 'engineering'];

  uprawnienia1 = [1, 3, 5, 7, 16, 18, 20, 31, 35, 46, 61, 65, 66, 76, 91, 112];
  uprawnienia2 = [2, 3, 6, 7, 17, 18, 21, 32, 33, 36, 47, 62, 63, 66, 77, 92, 112];
  uprawnienia3 = [4, 5, 6, 7, 19, 20, 21, 34, 35, 36, 49, 64, 65, 66, 79, 94, 112];
  uprawnienia4 = [15, 16, 17, 18, 19, 20, 21, 45, 46, 47, 49, 75, 76, 77, 79, 105, 112];
  uprawnienia5 = [30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 49, 90, 91, 92, 94, 105, 112];
  uprawnienia6 = [60, 61, 62, 63, 64, 65, 66, 75, 76, 77, 79, 90, 91, 92, 94, 105, 112];

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
    this.cmsAuthService.getId().subscribe(response => {
      const loggedId = response.id;
      if (id === loggedId) {
        console.log("Nie można usunąć swojego konta");
      } else {
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
    });
  }

  getPermissionIcon(permission: number): string[] {
    let icons: string[] = [];

    if (this.uprawnienia1.includes(permission)) {
      icons.push(this.permissionsIcons[0]);
    }
    if (this.uprawnienia2.includes(permission)) {
      icons.push(this.permissionsIcons[1]);
    }
    if (this.uprawnienia3.includes(permission)) {
      icons.push(this.permissionsIcons[2]);
    }
    if (this.uprawnienia4.includes(permission)) {
      icons.push(this.permissionsIcons[3]);
    }
    if (this.uprawnienia5.includes(permission)) {
      icons.push(this.permissionsIcons[4]);
    }
    if (this.uprawnienia6.includes(permission)) {
      icons.push(this.permissionsIcons[5]);
    }
    return icons
  }
  getPermissionIconTooltip(icon: string) {
    switch (icon) {
      case this.permissionsIcons[0]:
        return 'Pisanie artykułów/edycja/usuwanie swoich artykułów';
      case this.permissionsIcons[1]:
        return 'Przegląd/wysyłanie/edycja/usuwanie wszystkich artykułów';
      case this.permissionsIcons[2]:
        return 'Dodawanie/edycja/usuwanie ofert franczyz';
      case this.permissionsIcons[3]:
        return 'Dodawanie/edycja/usuwanie użytkowników';
      case this.permissionsIcons[4]:
        return 'Dodawanie/edycja/usuwanie przedstawicieli';
      case this.permissionsIcons[5]:
        return 'Dodawanie/edycja/usuwanie pracowników';
      default:
        return '';
    }
  }
}
