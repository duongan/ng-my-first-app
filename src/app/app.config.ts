import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from '@store/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp({
        "projectId": "ng-my-first-app-1a1af",
        "appId": "1:702509814751:web:00064e0a89d7fbd122ea6a",
        "databaseURL": "https://ng-my-first-app-1a1af-default-rtdb.firebaseio.com",
        "storageBucket": "ng-my-first-app-1a1af.appspot.com",
        "apiKey": "AIzaSyCTYJPkNzLn0wd-eodoOX-8EkAAqogcJRE",
        "authDomain": "ng-my-first-app-1a1af.firebaseapp.com",
        "messagingSenderId": "702509814751",
        "measurementId": "G-KD72BNB86R"
    })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStore({
        auth: authReducer
    }),
    // provideState({
    //     name: 'auth',
    //     reducer: authReducer
    // })
]
};
