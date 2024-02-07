import { TestBed } from '@angular/core/testing';

import { AuthCMSService } from './auth-cms.service';

describe('AuthCMSService', () => {
  let service: AuthCMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
