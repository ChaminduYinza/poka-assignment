import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-plant-description-card',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './plant-description-card.component.html',
  styleUrl: './plant-description-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantDescriptionCardComponent {
  @Input() description: string = '';
}
