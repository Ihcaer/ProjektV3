import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BladLogowaniaSnackbarComponent } from './blad-logowania-snackbar.component';

describe('BladLogowaniaSnackbarComponent', () => {
  let component: BladLogowaniaSnackbarComponent;
  let fixture: ComponentFixture<BladLogowaniaSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BladLogowaniaSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BladLogowaniaSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
