import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as entry from './entry/entry.reducer'

export interface AppState {
   ui: ui.State,
   user: auth.State,
   entry: entry.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   entry: entry.entryReducer
}