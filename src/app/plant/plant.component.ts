import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PlantListCardComponent } from './plant-cards/plant-list-card/plant-list-card.component';
import { PlantRes } from '../model/plant.mode';
import { CommonModule } from '@angular/common';
import { APIService } from '../service/api.service';
import { environment } from '../../environments/environment';
import { Observable, Subscription, filter, finalize, first } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDataList } from '../state-management/selectors/plant.selectors';
import * as PlantAction from '../state-management/actions/plant.action';
import { BlockUiComponent } from '../block-ui/block-ui.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plant',
  standalone: true,
  providers: [APIService],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.scss',
  imports: [CommonModule, PlantListCardComponent, RouterLink, BlockUiComponent],
})
export class PlantComponent implements OnInit, OnDestroy {
  // TODO: scroll to the latest added card when load more happen
  @ViewChild('listContainer') listContainer!: ElementRef;

  subscription: Subscription = new Subscription();
  plantOb$: Observable<PlantRes>;
  isLoading: boolean = false;
  constructor(private apiService: APIService, private store: Store) {
    this.plantOb$ = this.store.select(selectDataList);
  }

  ngOnInit(): void {
    this.plantOb$
      .pipe(
        first(), // using to avoid memory leaks
        filter((data) => !data || data.results.length === 0)
      )
      .subscribe(() => {
        // calling w/o paramters since onInit we have to take first page
        this.loadMoreResults();
      });
  }

  /**
   * triggers in onInit with fetchURL to null and when user click on load more button
   * @param fetchURL handling pagination eg ?offset=10
   */
  loadMoreResults(fetchURL: string | null = ''): void {
    this.isLoading = true;
    const URL = environment.api_plant_base_url + fetchURL;
    this.subscription.add(
      this.apiService
        .getPlantListData(URL)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response: PlantRes) => this.setResults(response),
          error: () => {
            Swal.fire({
              title: 'Oops!',
              text: 'Something went wrong. Please try again later',
              icon: 'error',
            });
            console.error('There was an error!');
          },
        })
    );
  }

  /**
   * capture result and push into ngrx store
   * @param response PlantRes res from API
   */
  setResults(response: PlantRes): void {
    if (response != null && response.results?.length > 0) {
      this.store.dispatch(PlantAction.setPlantsData({ plantRes: response }));
    }
  }

  /**
   * un subscribe on componenet destroy
   */
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
