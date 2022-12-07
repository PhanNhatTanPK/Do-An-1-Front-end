import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCompanyComponent } from './manager-company.component';

describe('ManagerCompanyComponent', () => {
  let component: ManagerCompanyComponent;
  let fixture: ComponentFixture<ManagerCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
