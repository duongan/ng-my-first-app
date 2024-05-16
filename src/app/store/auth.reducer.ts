import { User } from '@angular/fire/auth';
import { createReducer, on } from '@ngrx/store';
import { signIn, signOut } from './actions';

export type UserState = User | null;

export interface AuthState {
    user: UserState
}
export const initialState: AuthState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(signIn, (state, { user }) => ({...state, user })),
    on(signOut, state => ({ ...state, user: null }))
);