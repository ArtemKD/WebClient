/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrainPathComponent } from './train-path.component';

describe('TrainPathComponent', () => {
  let component: TrainPathComponent;
  let fixture: ComponentFixture<TrainPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
