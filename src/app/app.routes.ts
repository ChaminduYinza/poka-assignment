import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'plants' },
  {
    path: 'plants',
    loadComponent: () =>
      import('./plant/plant.component').then((mod) => mod.PlantComponent),
  },
  {
    path: 'plants/:index',
    loadComponent: () =>
      import('./plant-detail/plant-detail.component').then(
        (mod) => mod.PlantDetailComponent
      ),
  },
];
