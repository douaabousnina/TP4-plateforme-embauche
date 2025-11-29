import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredList } from './hired-list';

describe('HiredList', () => {
  let component: HiredList;
  let fixture: ComponentFixture<HiredList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiredList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
