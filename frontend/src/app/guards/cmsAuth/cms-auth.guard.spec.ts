import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cmsAuthGuard } from './cms-auth.guard';

describe('cmsAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cmsAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
