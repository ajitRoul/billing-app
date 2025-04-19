import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLineComponent } from './help-line.component';

describe('HelpLineComponent', () => {
  let component: HelpLineComponent;
  let fixture: ComponentFixture<HelpLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
