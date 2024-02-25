import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAddressCardComponent } from './plant-address-card.component';
import { PlantDetail } from '../../../model/plant.mode';

describe('PlantAddressCardComponent', () => {
  let component: PlantAddressCardComponent;
  let fixture: ComponentFixture<PlantAddressCardComponent>;
  const mockResult: Omit<
    PlantDetail,
    'description' | 'division' | 'id' | 'name'
  > = {
    address: '119 Webb View Apt. 563',
    city: 'TEST',
    country: 'TEST',
    phone: '123',
    manager: 'Jorge Bowen',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantAddressCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantAddressCardComponent);
    component = fixture.componentInstance;
    component.addressDetail = mockResult;
    fixture.detectChanges();
  });

  it('should create PlantAddressCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should format address details correctly', () => {
    component.formatAddressDetail();
    const expectedFormattedAddress = '119 Webb View Apt. 563\nTEST, TEST\n123';

    expect(component.addressDetailFormatted).toEqual(expectedFormattedAddress);
  });
});
