import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import {
    Auth,
    user,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    User,
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { signIn } from '@store/actions';
import { AuthState } from '@store/auth.reducer';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth: Auth = inject(Auth);
    private user$ = user(this.auth);

    constructor(private store: Store<AuthState>) {}

    authenticate() {
        return this.user$.pipe(
            tap((user) => {
                if (!user) {
                    return false;
                }
                return true;
            }),
        );
    }

    signInWithEmail(
        email: string,
        password: string,
        success?: (user: User) => void,
        failure?: (error: any) => void,
    ) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then(({ user }) => {
                if (user) {
                    if (success) success(user);
                    return;
                }

                if (failure) failure({});
            })
            .catch(failure);
    }

    signOut(cb: () => void) {
        firebaseSignOut(this.auth).then(cb);
    }
}
