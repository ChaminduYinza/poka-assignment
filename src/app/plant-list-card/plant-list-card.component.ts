import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Plant } from '../model/plant.mode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plant-list-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './plant-list-card.component.html',
  styleUrl: './plant-list-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantListCardComponent {
  @Input() plant!: Plant;

  construct() {}
}
