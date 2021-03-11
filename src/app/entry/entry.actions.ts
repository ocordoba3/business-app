import { createAction, props } from '@ngrx/store';
import { Entry } from '../models/entry';

export const setItems = createAction('[Entry] Set Items', props<{items: Entry[]}>());
export const unsetItems = createAction('[Entry] Unset Items');