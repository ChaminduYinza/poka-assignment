import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Plant } from '../../../model/plant.model';
import { CardComponent } from '../../../shared/card/card.component';
import { CardVariant } from '../../../model/card-variant.enum';

@Component({
  selector: 'app-plant-list-card',
  standalone: true,
  templateUrl: './plant-list-card.component.html',
  styleUrl: './plant-list-card.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantListCardComponent {
  @Input() plant!: Plant;
  CardVariant = CardVariant;
}
