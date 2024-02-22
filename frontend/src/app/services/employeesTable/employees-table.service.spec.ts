import { TestBed } from '@angular/core/testing';

import { EmployeesTableService } from './employees-table.service';

describe('EmployeesTableService', () => {
  let service: EmployeesTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
