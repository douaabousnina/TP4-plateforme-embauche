import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvListComponent } from './cv-list.component';

describe('CvListComponent', () => {
  let component: CvListComponent;
  let fixture: ComponentFixture<CvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
