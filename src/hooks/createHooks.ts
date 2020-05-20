import { Store } from 'redux';
import { createProvideStore, ProvideStore } from './provideStore';
import { createUseStore, UseStore } from './useStore';
import { createUseDispatch, UseDispatch } from './useDispatch';
import { createUseSelector, UseSelector } from './useSelector';

export interface ReduxHooks<T extends Store> {
  provideStore: ProvideStore<T>;
  useStore: UseStore<T>;
  useDispatch: UseDispatch<T['dispatch']>;
  useSelector: UseSelector<T>;
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
