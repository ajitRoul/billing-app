import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillDetailsComponent } from './update-bill-details.component';

describe('UpdateBillDetailsComponent', () => {
  let component: UpdateBillDetailsComponent;
  let fixture: ComponentFixture<UpdateBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBillDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
