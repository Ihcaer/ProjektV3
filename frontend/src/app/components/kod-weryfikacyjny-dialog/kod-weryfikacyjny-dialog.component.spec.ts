import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KodWeryfikacyjnyDialogComponent } from './kod-weryfikacyjny-dialog.component';

describe('KodWeryfikacyjnyDialogComponent', () => {
  let component: KodWeryfikacyjnyDialogComponent;
  let fixture: ComponentFixture<KodWeryfikacyjnyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KodWeryfikacyjnyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KodWeryfikacyjnyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
