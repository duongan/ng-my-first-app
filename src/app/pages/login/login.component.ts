import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth.reducer';
import { signIn } from '@store/actions';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    email = new FormControl('');
    password = new FormControl('');

    constructor(
        private store: Store<AuthState>,
        private router: Router,
        private auth: AuthService,
    ) {}

    ngOnInit() {
        // this.store.select('user').subscribe((u) => console.log('ngajlk', u));
    }

    onSubmit() {
        const { value: email } = this.email || {};
        const { value: password } = this.password || {};

        if (!email || !password) {
            return;
        }

        this.auth.signInWithEmail(email, password, (user) => {
            this.router.navigate(['/']);
            // this.store.dispatch(signIn({ user }));
        });
    }
}
