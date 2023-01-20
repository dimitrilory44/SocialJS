import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurClientAuthComponent } from './erreur-client-auth.component';

describe('ErreurClientComponent', () => {
  let component: ErreurClientAuthComponent;
  let fixture: ComponentFixture<ErreurClientAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurClientAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurClientAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
