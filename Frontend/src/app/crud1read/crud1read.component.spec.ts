import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud1readComponent } from './crud1read.component';

describe('Crud1readComponent', () => {
  let component: Crud1readComponent;
  let fixture: ComponentFixture<Crud1readComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crud1readComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Crud1readComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
