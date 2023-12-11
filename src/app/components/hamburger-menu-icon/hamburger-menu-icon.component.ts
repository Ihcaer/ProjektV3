import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-hamburger-menu-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger-menu-icon.component.html',
  styleUrl: './hamburger-menu-icon.component.scss',
  animations: [
    trigger('menuAnimation', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(-180deg)',
      })),
      transition('closed <=> open', animate('0.3s ease-in-out'))
    ])
  ]
})
export class HamburgerMenuIconComponent implements OnInit {
  menuState: string = 'closed';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleMenu(): void {
    this.menuState = (this.menuState === 'closed') ? 'open' : 'closed';
  }
}
