import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { EmployeesTableService } from '../../services/employeesTable/employees-table.service';
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

  constructor(private employeesTableService: EmployeesTableService, private router: Router, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

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
