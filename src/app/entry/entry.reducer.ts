import { createReducer, on } from '@ngrx/store';
import { Entry } from '../models/entry';
import { setItems, unsetItems } from './entry.actions';

export interface State {
    items: Entry[]; 
}

export const initialState: State = {
   items: [],
}

const _entryReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(unsetItems, (state) => ({ ...state, items: []})),

);

export function entryReducer(state, action) {
    return _entryReducer(state, action);
}