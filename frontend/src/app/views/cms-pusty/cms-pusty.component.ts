import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-cms-pusty',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cms-pusty.component.html',
  styleUrl: './cms-pusty.component.scss'
})
export class CmsPustyComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    const currentPath = this.router.url;

    if (currentPath === '/cms') {
      this.router.navigate(['/cms/logged/aktualnosci']);
    }
  }
}
