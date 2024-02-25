import { createFeatureSelector } from '@ngrx/store';
import { PlantRes } from '../../model/plant.mode';

export const selectDataList = createFeatureSelector<PlantRes>('plantList');
