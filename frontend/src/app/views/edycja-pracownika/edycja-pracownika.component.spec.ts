import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdycjaPracownikaComponent } from './edycja-pracownika.component';

describe('EdycjaPracownikaComponent', () => {
  let component: EdycjaPracownikaComponent;
  let fixture: ComponentFixture<EdycjaPracownikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdycjaPracownikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdycjaPracownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
