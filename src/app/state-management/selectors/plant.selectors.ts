import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlantRes } from '../../model/plant.mode';

export const selectDataList = createFeatureSelector<PlantRes>('plantList');

export const selectPlantListEmpty = createSelector(
  selectDataList,
  (dataList: PlantRes) => !dataList || dataList.results.length <= 0
);
