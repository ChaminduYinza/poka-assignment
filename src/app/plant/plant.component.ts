import {
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
import { Observable, Subscription, filter, first } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDataList } from '../state-management/selectors/plant.selectors';
import * as PlantAction from '../state-management/actions/plant.action';

@Component({
  selector: 'app-plant',
  standalone: true,
  imports: [CommonModule, PlantListCardComponent, RouterLink],
  providers: [APIService],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.scss',
})
export class PlantComponent implements OnInit, OnDestroy {
  @ViewChild('listContainer') listContainer!: ElementRef;

  subscription: Subscription = new Subscription();
  plantOb$: Observable<PlantRes>;

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
        this.loadMoreResults();
      });
  }

  loadMoreResults(fetchURL: string | null = ''): void {
    const URL = environment.api_plant_base_url + fetchURL;
    this.subscription.add(
      this.apiService.getPlantListData(URL).subscribe({
        next: (response: PlantRes) => this.setResults(response),
        error: (error) => console.error('There was an error!', error),
      })
    );
  }

  setResults(response: PlantRes): void {
    if (response != null && response.results?.length > 0) {
      this.store.dispatch(PlantAction.setPlantsData({ plantRes: response }));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}