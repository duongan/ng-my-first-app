import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '@store/auth.reducer';
import { AppState, loggedInUser } from '@store/index';
import { Observable } from 'rxjs';
import { Auth, user, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private firebaseAuth: Auth = inject(Auth);
  firebaseUser$ = user(this.firebaseAuth);

  user$: Observable<UserState>;

  constructor(private store: Store<AppState>) {
    this.firebaseUser$.subscribe(u => console.log('u', u));
    this.user$ = this.store.select(loggedInUser);
  }

  ngOnInit() {
    // this.user$.subscribe(r => console.log('rrrr', r));
  }

  logout() {
    signOut(this.firebaseAuth)
      .then((res) => {
        console.log('logged out!!!', res);
      })
      .catch(error => {
        console.log('logged out fail!!!', error)
      });
  }

}
