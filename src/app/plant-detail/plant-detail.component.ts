import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { APIService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { PlantDetail } from '../model/plant.mode';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PlantAddressCardComponent } from '../plant-address-card/plant-address-card.component';
import { CommonModule, Location } from '@angular/common';
import { PlantDescriptionCardComponent } from '../plant-description-card/plant-description-card.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.scss',
  imports: [
    PlantAddressCardComponent,
    CommonModule,
    PlantDescriptionCardComponent,
  ],
})
export class PlantDetailComponent implements OnInit, OnDestroy {
  plantDetail: PlantDetail | null = null;
  addressData!: Pick<PlantDetail, 'address' | 'manager'>;
  private apiService = inject(APIService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private location = inject(Location);
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const index = Number(params.get('index'));
            return this.getPlantDetails(index);
          })
        )
        .subscribe({
          next: (response: PlantDetail) => {
            if (response) {
              const { address, manager } = response;
              this.plantDetail = response;
              this.addressData = { address, manager };
              this.titleService.setTitle(`Pola | ${response.name}`);
            } else {
              console.error('There was an error!');
            }
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        })
    );
  }

  private getPlantDetails(index: number) {
    const URL = environment.api_plant_base_url + `/${index}/`;
    return this.apiService.getPlantDetail(URL);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
