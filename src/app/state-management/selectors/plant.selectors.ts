import { createFeatureSelector } from '@ngrx/store';
import { PlantRes } from '../../model/plant.model';

export const selectDataList = createFeatureSelector<PlantRes>('plantList');
