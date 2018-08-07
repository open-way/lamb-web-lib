import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LambInputIconComponent } from './input-icon.component';

describe('LambInputIconComponent', () => {
  let component: LambInputIconComponent;
  let fixture: ComponentFixture<LambInputIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LambInputIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LambInputIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
