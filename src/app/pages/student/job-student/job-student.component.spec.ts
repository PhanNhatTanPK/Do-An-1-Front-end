import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStudentComponent } from './job-student.component';

describe('JobStudentComponent', () => {
  let component: JobStudentComponent;
  let fixture: ComponentFixture<JobStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
