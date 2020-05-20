import { Store } from 'redux';
import { createProvideStore, ProvideStore } from './provideStore';
import { createUseStore, UseStore } from './useStore';
import { createUseDispatch, UseDispatch } from './useDispatch';
import { createUseSelector, UseSelector } from './useSelector';
import { StateOf, DispatchOf } from './types';

export interface ReduxHooks<T extends Store> {
  provideStore: ProvideStore<T>;
  useStore: UseStore<T>;
  useDispatch: UseDispatch<DispatchOf<T>>;
  useSelector: UseSelector<StateOf<T>>;
}

export function createHooks<T extends Store = Store>(): ReduxHooks<T> {
  const injectionKey = Symbol();
  const provideStore = createProvideStore<T>(injectionKey);
  const useStore = createUseStore<T>(injectionKey);
  const useDispatch = createUseDispatch<T>(useStore);
  const useSelector = createUseSelector<T>(useStore);

  return {
    provideStore,
    useStore,
    useDispatch,
    useSelector,
  };
}
