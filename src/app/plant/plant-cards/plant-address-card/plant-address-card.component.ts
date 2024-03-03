import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PlantDetail } from '../../../model/plant.model';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-plant-address-card',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './plant-address-card.component.html',
  styleUrl: './plant-address-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantAddressCardComponent implements OnInit {
  @Input() addressDetail!: Omit<
    PlantDetail,
    'description' | 'division' | 'id' | 'name'
  >;
  addressDetailFormatted: string = '';

  ngOnInit(): void {
    this.formatAddressDetail();
  }

  /**
   * for received input to display on address card
   */
  formatAddressDetail(): void {
    const { address, city, country, phone } = this.addressDetail;
    this.addressDetailFormatted = `${address}\n${city}, ${country}\n${phone}`;
  }
}
