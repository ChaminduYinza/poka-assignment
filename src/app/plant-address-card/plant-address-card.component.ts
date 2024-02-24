import { Component, Input } from '@angular/core';
import { PlantDetail } from '../model/plant.mode';

@Component({
  selector: 'app-plant-address-card',
  standalone: true,
  imports: [],
  templateUrl: './plant-address-card.component.html',
  styleUrl: './plant-address-card.component.scss',
})
export class PlantAddressCardComponent {
  @Input() addressDetail!: Pick<PlantDetail, 'address' | 'manager'>;
}
