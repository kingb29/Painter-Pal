import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingHomePage } from './shopping.page';

describe('ShoppingHomePage', () => {
  let component: ShoppingHomePage;
  let fixture: ComponentFixture<ShoppingHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingHomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
