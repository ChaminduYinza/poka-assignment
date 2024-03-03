import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, finalize, switchMap } from 'rxjs';
import { PlantService } from '../../service/plant.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlantDetail } from '../../model/plant.model';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PlantAddressCardComponent } from '../plant-cards/plant-address-card/plant-address-card.component';
import { CommonModule } from '@angular/common';
import { PlantDescriptionCardComponent } from '../plant-cards/plant-description-card/plant-description-card.component';
import { BlockUiComponent } from '../../block-ui/block-ui.component';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../shared/header/header.component';
import { HeaderVariant } from '../../model/header-variant.enum';

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
    RouterLink,
    HeaderComponent,
  ],
})
export class PlantDetailComponent implements OnInit, OnDestroy {
  plantDetail: PlantDetail | null = null;
  HeaderVariant = HeaderVariant;
  addressData!: Omit<PlantDetail, 'description' | 'division' | 'id' | 'name'>;
  subscription: Subscription = new Subscription();
  private apiService = inject(PlantService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  isLoading = false;

  ngOnInit(): void {
    // setting spinner (loader) true
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          // router param which includes the plantid
          const index = Number(params.get('index'));
          return this.getPlantDetails(index).pipe(
            // setting spinner (loader) false
            finalize(() => (this.isLoading = false))
          );
        })
      )
      .subscribe({
        next: (response: PlantDetail) => {
          this.handleResponse(response);
        },
        error: () => {
          this.handleError();
        },
      });
  }

  /**
   * destruct response and assign in order to pass into child componenets
   * updating title based on the plant name
   * @param response PlantDetail: api response
   */
  handleResponse(response: PlantDetail): void {
    if (response) {
      const { address, city, country, manager, phone, name } = response;
      this.plantDetail = response;
      this.addressData = { address, city, country, manager, phone };

      // change browser title
      this.titleService.setTitle(`Poka | ${name}`);
    } else {
      this.handleError();
    }
  }

  /**
   * handle API error
   * @param error
   */
  handleError(): void {
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong. Please try again later',
      icon: 'error',
    });
  }

  /**
   * call API to fetch plant details
   * @param index plant id
   * @returns
   */
  getPlantDetails(index: number) {
    const URL = environment.api_plant_base_url + `/${index}/`;
    return this.apiService.getPlantDetail(URL);
  }

  /**
   * un subscribe on destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
