import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBetComponent } from './create-bet.component';

describe('CreateBetComponent', () => {
  let component: CreateBetComponent;
  let fixture: ComponentFixture<CreateBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
