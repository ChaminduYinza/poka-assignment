import { createReducer, on } from '@ngrx/store';
import * as PlantActions from '../actions/plant.action';
import { PlantRes } from '../../model/plant.model';

export const initialState: PlantRes = {
  next: null,
  results: [],
};

export const plantReducer = createReducer(
  initialState,
  on(PlantActions.setPlantsData, (state, action) => {
    const plant = { ...action.plantRes };
    return {
      ...state,
      next: plant.next,
      results: [...state.results, ...plant.results],
    };
  }),
  on(PlantActions.getPlantsData, (state) => state)
);
