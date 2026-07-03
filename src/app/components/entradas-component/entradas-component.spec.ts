import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasComponent } from './entradas-component';

describe('EntradasComponent', () => {
  let component: EntradasComponent;
  let fixture: ComponentFixture<EntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntradasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
