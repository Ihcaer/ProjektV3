import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuKontaComponent } from './menu-konta.component';

describe('MenuKontaComponent', () => {
  let component: MenuKontaComponent;
  let fixture: ComponentFixture<MenuKontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuKontaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuKontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
