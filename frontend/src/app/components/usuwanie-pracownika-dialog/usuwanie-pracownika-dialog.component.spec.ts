import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuwaniePracownikaDialogComponent } from './usuwanie-pracownika-dialog.component';

describe('UsuwaniePracownikaDialogComponent', () => {
  let component: UsuwaniePracownikaDialogComponent;
  let fixture: ComponentFixture<UsuwaniePracownikaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuwaniePracownikaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuwaniePracownikaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
