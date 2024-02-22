import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeesTableService } from '../../services/employeesTable/employees-table.service';

@Component({
  selector: 'app-edycja-pracownika',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edycja-pracownika.component.html',
  styleUrl: './edycja-pracownika.component.scss'
})
export class EdycjaPracownikaComponent implements OnInit {
  id?: number;
  pracownik: any;

  constructor(private route: ActivatedRoute, private employeesTableService: EmployeesTableService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.employeesTableService.getEmployeeData(this.id).subscribe(pracownik => {
      this.pracownik = pracownik
    })
  }
}
