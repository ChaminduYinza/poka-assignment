import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantDetail, PlantRes } from '../model/plant.model';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiService = inject(APIService);

  getPlantListData(url: string): Observable<PlantRes> {
    return this.apiService.getData<PlantRes>(url);
  }

  getPlantDetail(url: string): Observable<PlantDetail> {
    return this.apiService.getData<PlantDetail>(url);
  }
}
