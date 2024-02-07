import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPustyComponent } from './cms-pusty.component';

describe('CmsPustyComponent', () => {
  let component: CmsPustyComponent;
  let fixture: ComponentFixture<CmsPustyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsPustyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsPustyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
