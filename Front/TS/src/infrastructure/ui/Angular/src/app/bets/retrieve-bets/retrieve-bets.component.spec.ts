import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveBetsComponent } from './retrieve-bets.component';

describe('RetrieveBetsComponent', () => {
  let component: RetrieveBetsComponent;
  let fixture: ComponentFixture<RetrieveBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrieveBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrieveBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
