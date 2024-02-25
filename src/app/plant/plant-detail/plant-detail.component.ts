import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, finalize, switchMap } from 'rxjs';
import { APIService} from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { PlantDetail } from '../../model/plant.mode';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PlantAddressCardComponent } from '../plant-cards/plant-address-card/plant-address-card.component';
import { CommonModule, Location } from '@angular/common';
import { PlantDescriptionCardComponent } from '../plant-cards/plant-description-card/plant-description-card.component';
import { BlockUiComponent } from '../../block-ui/block-ui.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.scss',
  imports: [
    PlantAddressCardComponent,
    CommonModule,
    PlantDescriptionCardComponent,
    BlockUiComponent,
  ],
})
export class PlantDetailComponent implements OnInit, OnDestroy {
  plantDetail: PlantDetail | null = null;
  addressData!: Omit<PlantDetail, 'description' | 'division' | 'id' | 'name'>;
  subscription: Subscription = new Subscription();
  private apiService = inject(APIService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  public location = inject(Location);
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const index = Number(params.get('index'));
            return this.getPlantDetails(index).pipe(
              finalize(() => (this.isLoading = false))
            );
          })
        )
        .subscribe({
          next: (response: PlantDetail) => {
            if (response) {
              const { address, city, country, manager, phone, name } = response;
              this.plantDetail = response;
              this.addressData = { address, city, country, manager, phone };
              this.titleService.setTitle(`Poka | ${name}`);
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

  getPlantDetails(index: number) {
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
