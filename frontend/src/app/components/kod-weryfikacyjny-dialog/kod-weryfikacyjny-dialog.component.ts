import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogData } from '../../views/employee-register/employee-register.component';

@Component({
  selector: 'app-kod-weryfikacyjny-dialog',
  standalone: true,
  imports: [MatIconModule, ClipboardModule, MatTooltipModule],
  templateUrl: './kod-weryfikacyjny-dialog.component.html',
  styleUrl: './kod-weryfikacyjny-dialog.component.scss'
})
export class KodWeryfikacyjnyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private clipboard: Clipboard, public employeeRegDialogRef: MatDialogRef<KodWeryfikacyjnyDialogComponent>) { }

  get kodWeryfikacyjny(): number {
    return this.data.kodWeryfikacyjny;
  }

  copyVerCode(text: string) {
    this.clipboard.copy(text);
  }

  closeDialog(): void {
    this.employeeRegDialogRef.close();
  }
}
