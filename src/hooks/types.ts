import { Store } from 'redux';

export type StateOf<T extends Store> = ReturnType<T['getState']>;

export type DispatchOf<T extends Store> = T['dispatch'];
