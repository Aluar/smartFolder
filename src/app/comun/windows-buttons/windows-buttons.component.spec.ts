import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowsButtonsComponent } from './windows-buttons.component';

describe('WindowsButtonsComponent', () => {
  let component: WindowsButtonsComponent;
  let fixture: ComponentFixture<WindowsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
