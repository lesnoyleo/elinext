import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UglifytableComponent } from './uglifytable.component';

describe('UglifytableComponent', () => {
  let component: UglifytableComponent;
  let fixture: ComponentFixture<UglifytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UglifytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UglifytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
