import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

import { CmsPodswietlenieSMService } from '../../services/cms-podswietlenie-sm/cms-podswietlenie-sm.service';
import { MenuKontaComponent } from '../../components/menu-konta/menu-konta.component';
import { HamburgerMenuIconComponent } from "../../components/hamburger-menu-icon/hamburger-menu-icon.component";

@Component({
  selector: 'app-cms',
  standalone: true,
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss',
  animations: [
    /*trigger('otwieranieMenu', [
      transition(':enter', [
        style({ opacity: 1, height: 0 }),
        animate('0.3s ease', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('0.3s ease', style({ opacity: 1, height: 0 }))
      ])
    ]),*/
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
    ])
  ],
  imports: [CommonModule, MenuKontaComponent, RouterOutlet, HamburgerMenuIconComponent]
})
export class CmsComponent implements OnInit {

  constructor(private titleService: Title, private router: Router, protected podswietlenieSM: CmsPodswietlenieSMService, private cdRef: ChangeDetectorRef) {
    this.titleService.setTitle('CMS');
  }

  ngOnInit() {
    this.podswietlenieSM.activeAktywnosc = true;
    this.cdRef.detectChanges();
  }

  navigateToCMS() {
    this.router.navigate(['/cms']);
    this.podswietlenieSM.activeAktywnosc = true;
  }

  isMenuArtykulyOpen = false;
  toggleMenuArtykuly() {
    this.isMenuArtykulyOpen = !this.isMenuArtykulyOpen;
  }
}
