import { CommonModule } from '@angular/common';
import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, UserState } from '@store/auth.reducer';
import { AppState, loggedInUser } from '@store/index';
import { Observable } from 'rxjs';
import { Auth, user, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private firebaseAuth: Auth = inject(Auth);
    firebaseUser$ = user(this.firebaseAuth);

    // user$: Observable<UserState>;

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private auth: AuthService,
    ) {
        // this.firebaseUser$.subscribe(u => console.log('u', u));
        // this.user$ = this.store.select(loggedInUser);
    }

    ngOnInit() {
        this.store
            .select(loggedInUser)
            .subscribe((u) => console.log('ngajlk', u));
    }

    logout() {
        this.auth.signOut(() => {
            this.router.navigate(['/login']);
        });
    }
}
