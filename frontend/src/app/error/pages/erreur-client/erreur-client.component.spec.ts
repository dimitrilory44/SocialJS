import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurClientComponent } from './erreur-client.component';

describe('ErreurClientComponent', () => {
  let component: ErreurClientComponent;
  let fixture: ComponentFixture<ErreurClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
