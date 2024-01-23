import { TestBed } from '@angular/core/testing';

import { CmsPodswietlenieSMService } from './cms-podswietlenie-sm.service';

describe('CmsPodswietlenieSMService', () => {
  let service: CmsPodswietlenieSMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsPodswietlenieSMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
