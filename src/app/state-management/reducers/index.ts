import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { plantReducer } from './plant.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  plantList: plantReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
