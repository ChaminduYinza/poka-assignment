import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, finalize, switchMap } from 'rxjs';
import { APIService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { PlantDetail } from '../../model/plant.mode';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PlantAddressCardComponent } from '../plant-cards/plant-address-card/plant-address-card.component';
import { CommonModule, Location } from '@angular/common';
import { PlantDescriptionCardComponent } from '../plant-cards/plant-description-card/plant-description-card.component';
import { BlockUiComponent } from '../../block-ui/block-ui.component';
import Swal from 'sweetalert2';

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
        error: (error) => {
          this.handleError(error);
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
      this.logError('No plant details found.');
    }
  }

  /**
   * handle API error
   * @param error
   */
  handleError(error: string | Error): void {
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong. Please try again later',
      icon: 'error',
    });
    this.logError('There was an error!', error.toString());
  }

  /** // TODO: need to implement custom swal since instructions specified not to use visualization libraries
   * log error into console
   * @param message
   * @param error
   */
  logError(message: string, error?: string): void {
    console.error(message, error || '');
    // TODO: need to implement custom swal since instructions specified not to use visualization libraries
  }

  /**
   * call API to fetch plant details
   * @param index plant id
   * @returns
   */
  getPlantDetails(index: number) {
    const URL = environment.api_plant_base_url + `/${index}xx/`;
    return this.apiService.getPlantDetail(URL);
  }

  /**
   * handle browser back
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * un subscribe on destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
