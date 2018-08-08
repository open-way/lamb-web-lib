import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LambButtonIconComponent } from './button-icon.component';

describe('LambButtonIconComponent', () => {
  let component: LambButtonIconComponent;
  let fixture: ComponentFixture<LambButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LambButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LambButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
