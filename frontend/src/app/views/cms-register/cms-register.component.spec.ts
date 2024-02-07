import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsRegisterComponent } from './cms-register.component';

describe('CmsRegisterComponent', () => {
  let component: CmsRegisterComponent;
  let fixture: ComponentFixture<CmsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
