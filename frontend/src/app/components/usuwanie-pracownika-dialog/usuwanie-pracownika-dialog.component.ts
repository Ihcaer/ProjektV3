import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuwanie-pracownika-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './usuwanie-pracownika-dialog.component.html',
  styleUrl: './usuwanie-pracownika-dialog.component.scss'
})
export class UsuwaniePracownikaDialogComponent {
  constructor(public employeeDelDialogRef: MatDialogRef<UsuwaniePracownikaDialogComponent>) { }

  usun(): void {
    this.employeeDelDialogRef.close(true);
  }
  anuluj(): void {
    this.employeeDelDialogRef.close(false);
  }
}
