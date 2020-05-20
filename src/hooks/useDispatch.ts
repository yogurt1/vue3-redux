import { Dispatch, Store } from 'redux';
import { UseStore } from './useStore';

export interface UseDispatch<D extends Dispatch> {
  (): D;
}

export function createUseDispatch<T extends Store>(
  useStore: UseStore<T>,
): UseDispatch<T['dispatch']> {
  return function useDispatch() {
    const store = useStore();
    return function (...args) {
      return store.dispatch(...args);
    };
  };
}
