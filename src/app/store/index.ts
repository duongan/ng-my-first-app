import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface AppState {
    auth: AuthState;
}

export const selectAuth = (state: AppState) => state.auth;

export const loggedInUser = createSelector(selectAuth, (state) => state.user);
