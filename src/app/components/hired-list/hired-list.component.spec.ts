import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredListComponent } from './hired-list.component';

describe('HiredListComponent', () => {
  let component: HiredListComponent;
  let fixture: ComponentFixture<HiredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiredListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
