import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface Message {
  index: number;
  text: string;
}

@Component({
  selector: 'app-blad-logowania-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './blad-logowania-snackbar.component.html',
  styleUrl: './blad-logowania-snackbar.component.scss'
})
export class BladLogowaniaSnackbarComponent {
  message: Message;

  messages: Message[] = [
    { index: 0, text: 'Nieprawidłowe dane logowania.' },
    { index: 1, text: 'Pola logowania nie mogą być puste.' }
  ];

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    const messageIndex = data?.messageIndex;
    this.message = this.messages.find(msg => msg.index === messageIndex) || { index: -1, text: 'Brak wiadomości' };
  }
}
