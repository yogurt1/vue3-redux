import { Store } from 'redux';
import { inject } from '@vue/composition-api';

export interface UseStore<T> {
  (): T;
}

export function createUseStore<T extends Store>(injectionKey: symbol): UseStore<T> {
  return function useStore() {
    const store = inject<T>(injectionKey);

    if (typeof store === 'undefined') {
      throw new Error('no redux store provided. ensure you have called provideStore()');
    }

    return store;
  };
}
