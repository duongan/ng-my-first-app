import { Injectable, inject } from '@angular/core';
import {
    Auth,
    user,
    getAuth,
    onAuthStateChanged,
    User,
} from '@angular/fire/auth';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '@store/auth.reducer';
import { AppState, loggedInUser } from '@store/index';
import { Observable, Subscription, take, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    // private firebaseAuth: Auth = inject(Auth);
    // firebaseUser$ = user(this.firebaseAuth);
    // userSubscription?: Subscription;
    // authObserver$: Observable<UserState>;
    // currentUser: UserState = null;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        // this.authObserver$ = this.store.select(loggedInUser);
        // this.authObserver$.subscribe(user => {
        //     console.log('kiieieieie', user);
        //     if (user) {
        //         this.currentUser = user;
        //     }
        // });
        // this.userSubscription = this.firebaseUser$.subscribe();
        // console.log('AuthGuard - CONSTRUCTURING');
    }

    // canActivate(): Observable<boolean> {
    //     return this.firebaseUser$.pipe(map(user => {
    //         if (!user) {
    //             this.router.navigate(['/login']);
    //             return false;
    //         }
    //         return true;
    //     }));
    // }

    canActivate() {
        return this.authService.authenticate().pipe(
            tap((isLoggedIn) => {
                if (!isLoggedIn) {
                    this.router.navigate(['login']);
                }
                return isLoggedIn;
            }),
        );
    }
}
