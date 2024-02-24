import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListCardComponent } from './plant-list-card.component';

describe('PlantListCardComponent', () => {
  let component: PlantListCardComponent;
  let fixture: ComponentFixture<PlantListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
