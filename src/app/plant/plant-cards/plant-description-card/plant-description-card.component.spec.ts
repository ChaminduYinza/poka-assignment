import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDescriptionCardComponent } from './plant-description-card.component';

describe('PlantDescriptionCardComponent', () => {
  let component: PlantDescriptionCardComponent;
  let fixture: ComponentFixture<PlantDescriptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantDescriptionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDescriptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PlantDescriptionCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
