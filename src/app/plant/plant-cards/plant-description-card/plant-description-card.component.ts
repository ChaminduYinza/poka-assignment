import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-description-card',
  standalone: true,
  imports: [],
  templateUrl: './plant-description-card.component.html',
  styleUrl: './plant-description-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantDescriptionCardComponent {
  @Input() description: string = '';
}
