import { createAction, props } from '@ngrx/store';
import { PlantRes } from '../../model/plant.mode';

export const setPlantsData = createAction(
  '[Plant] Add Plants Data Object',
  props<{ plantRes: PlantRes }>()
);

export const getPlantsData = createAction('[Plant] Get Plants Data Object');
