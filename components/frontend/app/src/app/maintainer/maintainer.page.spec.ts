import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainerPage } from './maintainer.page';

describe('MaintainerPage', () => {
  let component: MaintainerPage;
  let fixture: ComponentFixture<MaintainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
