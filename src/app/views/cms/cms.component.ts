import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CmsPodswietlenieSMService } from '../../services/cms-podswietlenie-sm/cms-podswietlenie-sm.service';
import { MenuKontaComponent } from '../../components/menu-konta/menu-konta.component';

@Component({
  selector: 'app-cms',
  standalone: true,
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss',
  imports: [CommonModule, MenuKontaComponent, RouterOutlet],
  animations: [
    trigger('otwieranieMenu', [
      transition(':enter', [
        style({ opacity: 1, height: 0 }),
        animate('0.3s ease', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('0.3s ease', style({ opacity: 1, height: 0 }))
      ])
    ]),
    trigger('obrotStrzalki', [
      state('closed', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
        transform: 'rotate(0deg)' // Początkowa rotacja
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
        transform: 'rotate(180deg)' // Końcowa rotacja
      })),
      transition('closed <=> open', [
        animate('0.3s ease')
      ])
    ])
  ],
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
