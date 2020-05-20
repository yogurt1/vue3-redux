import { provide } from '@vue/composition-api';
import { Store } from 'redux';

export interface ProvideStore<T extends Store> {
  (store: T): void;
}

export function createProvideStore<T extends Store>(
  injectionKey: symbol
): ProvideStore<T> {
  return function provideStore(store) {
    provide(injectionKey, store);
  };
}
