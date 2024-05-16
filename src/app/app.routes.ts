import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignalsComponent } from './signals/signals.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'signals',
        component: SignalsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
