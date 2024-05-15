import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Auth, User, user, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  email = new FormControl('');
  password = new FormControl('');

  constructor() {}

  onSubmit() {
    console.log('Submitted!!!', this.email.value, this.password.value);
    const { value: email } = this.email || {};
    const { value: password } = this.password || {};

    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('user logged in', userCredential);
      })
      .catch(error => {
        console.log('user logged in fail', error);
      });
  }

}
