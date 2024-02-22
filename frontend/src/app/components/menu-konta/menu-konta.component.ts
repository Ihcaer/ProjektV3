import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDividerModule } from '@angular/material/divider';

import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

@Component({
  selector: 'app-menu-konta',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './menu-konta.component.html',
  styleUrl: './menu-konta.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MenuKontaComponent {
  employee: any;

  constructor(private router: Router, private cmsAuthService: AuthCMSService) { }

  isMenuKontaOpen = false;
  toggleMenuKonta() {
    this.isMenuKontaOpen = !this.isMenuKontaOpen;
  }

  przyciskUstawienia() {
    this.router.navigate(['/cms/ustawienia']);
  }

  wyloguj() {
    this.cmsAuthService.logout();
  }
}
