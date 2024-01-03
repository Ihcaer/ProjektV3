import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cms-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cms-login.component.html',
  styleUrl: './cms-login.component.scss'
})
export class CmsLoginComponent {
  user = {
    email: '',
    haslo: ''
  };

  zaloguj() {
    console.log(this.user);
  }
}
