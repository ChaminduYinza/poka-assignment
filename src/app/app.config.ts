import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './state-management/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    // using HashLocationStrategy since the screenshot contails urls with #
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
  ],
};
