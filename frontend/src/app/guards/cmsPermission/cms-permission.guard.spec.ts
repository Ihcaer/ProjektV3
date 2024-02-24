import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cmsPermissionGuard } from './cms-permission.guard';

describe('cmsPermissionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cmsPermissionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
