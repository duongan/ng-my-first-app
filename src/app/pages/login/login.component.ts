import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { signIn } from '@store/actions';
import { AuthState } from '@store/auth.reducer';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  private firebaseAuth: Auth = inject(Auth);

  email = new FormControl('');
  password = new FormControl('');

  constructor(private store: Store<AuthState>, private router: Router) {
    
  }

  onSubmit() {
    const { value: email } = this.email || {};
    const { value: password } = this.password || {};

    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(userCredential => {
        console.log('user logged in', userCredential);
        const { user } = userCredential;
        this.store.dispatch(signIn({ user }));
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('user logged in fail', error);
      });
  }

}
