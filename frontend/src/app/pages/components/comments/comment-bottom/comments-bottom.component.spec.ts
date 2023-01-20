import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsBottomComponent } from './comments-bottom.component';

describe('CommentsComponent', () => {
  let component: CommentsBottomComponent;
  let fixture: ComponentFixture<CommentsBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
