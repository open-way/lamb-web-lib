import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LambWebLibComponent } from './lamb-web-lib.component';

describe('LambWebLibComponent', () => {
  let component: LambWebLibComponent;
  let fixture: ComponentFixture<LambWebLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LambWebLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LambWebLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
