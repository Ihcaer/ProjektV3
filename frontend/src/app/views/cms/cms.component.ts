import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { MenuKontaComponent } from '../../components/menu-konta/menu-konta.component';
import { CmsPodswietlenieSMService } from '../../services/cms-podswietlenie-sm/cms-podswietlenie-sm.service';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';


@Component({
  selector: 'app-cms',
  standalone: true,
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss',
  animations: [
    trigger('otwieranieMenu', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('obrotStrzalki', [
      state('closed', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
        transform: 'rotate(180deg)'
      })),
      transition('closed <=> open', [
        animate('0.3s ease')
      ])
    ]),
    trigger('menuAnimation', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(-180deg)',
      })),
      transition('closed <=> open', animate('0.3s ease-in-out'))
    ])
  ],
  imports: [CommonModule, MenuKontaComponent, RouterOutlet]
})
export class CmsComponent implements OnInit, OnDestroy {
  menuState: string = 'closed';
  isLoggedIn: boolean = false;
  authSub: Subscription = new Subscription();
  hasPermission1: boolean = false;
  hasPermission2: boolean = false;
  hasPermission3: boolean = false;
  hasPermission4: boolean = false;
  hasPermission5: boolean = false;
  hasPermission6: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private titleService: Title, private router: Router, protected podswietlenieSM: CmsPodswietlenieSMService, private cmsAuthService: AuthCMSService) {
    this.titleService.setTitle('CMS');
  }

  ngOnInit() {
    this.authSub = this.cmsAuthService.isEmployeeLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.wyloguj();
      }
    });
    this.cmsAuthService.getPermission().subscribe(permissionObject => {
      const permissionNumber = permissionObject.permissionNumber;

      const uprawnienia1 = [1, 3, 5, 7, 16, 18, 20, 31, 35, 46, 61, 65, 66, 76, 91, 112];
      const uprawnienia2 = [2, 3, 6, 7, 17, 18, 21, 32, 33, 36, 47, 62, 63, 66, 77, 92, 112];
      const uprawnienia3 = [5, 6, 7, 19, 20, 21, 34, 35, 36, 49, 64, 65, 66, 79, 94, 112];
      const uprawnienia4 = [16, 17, 18, 19, 20, 21, 45, 46, 47, 49, 75, 76, 77, 79, 105, 112];
      const uprawnienia5 = [31, 32, 33, 34, 35, 36, 45, 46, 47, 49, 90, 91, 92, 94, 105, 112];
      const uprawnienia6 = [61, 62, 63, 64, 65, 66, 75, 76, 77, 79, 90, 91, 92, 94, 105, 112];

      this.hasPermission1 = uprawnienia1.includes(permissionNumber);
      this.hasPermission2 = uprawnienia2.includes(permissionNumber);
      this.hasPermission3 = uprawnienia3.includes(permissionNumber);
      this.hasPermission4 = uprawnienia4.includes(permissionNumber);
      this.hasPermission5 = uprawnienia5.includes(permissionNumber);
      this.hasPermission6 = uprawnienia6.includes(permissionNumber);
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  isPathActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored'
    });
  }

  navigateToCmsAktualnosci(kategoria: string) {
    if (kategoria === 'a') {
      this.router.navigate(['/cms/logged/aktualnosci']);
      //this.podswietlenieSM.activeAktywnosc = true;
    } else if (kategoria === 'p') {
      this.router.navigate(['cms/logged/pracownicy']);
    }
  }

  isMenuArtykulyOpen = false;
  toggleMenuArtykuly() {
    this.isMenuArtykulyOpen = !this.isMenuArtykulyOpen;
  }

  toggleMenu(): void {
    this.menuState = (this.menuState === 'closed') ? 'open' : 'closed';
  }

  wyloguj() {
    this.cmsAuthService.logout();
    this.isLoggedIn = false;
  }
}
