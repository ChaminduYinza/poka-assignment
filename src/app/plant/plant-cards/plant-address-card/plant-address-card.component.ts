import { Component, Input, OnInit } from '@angular/core';
import { PlantDetail } from '../../../model/plant.mode';

@Component({
  selector: 'app-plant-address-card',
  standalone: true,
  imports: [],
  templateUrl: './plant-address-card.component.html',
  styleUrl: './plant-address-card.component.scss',
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

  formatAddressDetail(): void {
    const { address, city, country, phone } = this.addressDetail;
    this.addressDetailFormatted = `${address}\n${city}, ${country}\n${phone}`;
  }
}
