import { Injectable, inject } from "@angular/core";
import { Auth, user, getAuth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { UserState } from "@store/auth.reducer";
import { AppState, loggedInUser } from "@store/index";
import { Observable, Subscription, take, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    private firebaseAuth: Auth = inject(Auth);
    firebaseUser$ = user(this.firebaseAuth);
    // userSubscription?: Subscription;
    // authObserver$: Observable<UserState>;
    // currentUser: UserState = null;

    constructor(private router: Router) {
        // this.authObserver$ = this.store.select(loggedInUser);
        // this.authObserver$.subscribe(user => {
        //     console.log('kiieieieie', user);
        //     if (user) {
        //         this.currentUser = user;
        //     }
        // });

        // this.userSubscription = this.firebaseUser$.subscribe();
    }

    canActivate(): Observable<boolean> {
        const tmp = user(this.firebaseAuth);
        return new Observable<boolean>(observer => {
            tmp.subscribe(user => {
                if (!user) {
                    observer.next(false);
                    this.router.navigate(['/login']);
                } else {
                    observer.next(true);
                }
                observer.complete();
            });
        });

        // return this.firebaseUser$.pipe(map(authState => authState));

        // onAuthStateChanged(this.auth, user => {
        //     console.log('lkjlkj', user);
        //     if (!user) {
        //         this.router.navigate(['login']);
        //         return false;
        //     }

        //     return true;
        // })
        
    }
}