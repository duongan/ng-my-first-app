import { Routes } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: 'signals',
        component: SignalsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
