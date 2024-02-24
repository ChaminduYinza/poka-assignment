import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAddressCardComponent } from './plant-address-card.component';

describe('PlantAddressCardComponent', () => {
  let component: PlantAddressCardComponent;
  let fixture: ComponentFixture<PlantAddressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantAddressCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
