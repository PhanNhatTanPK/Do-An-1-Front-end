import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNewComponent } from './manager-new.component';

describe('ManagerNewComponent', () => {
  let component: ManagerNewComponent;
  let fixture: ComponentFixture<ManagerNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
