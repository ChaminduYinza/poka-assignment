import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantDetail, PlantRes } from '../model/plant.mode';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private http = inject(HttpClient);
  constructor() {}

  getPlantListData(url: string): Observable<PlantRes> {
    return this.http.get<PlantRes>(url);
  }

  getPlantDetail(url: string): Observable<PlantDetail> {
    return this.http.get<PlantDetail>(url);
  }
}
