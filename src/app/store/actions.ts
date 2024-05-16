import { User } from '@angular/fire/auth';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Auth] Sign In', props<{ user: User }>());
export const signOut = createAction('[Auth] Sign Out');