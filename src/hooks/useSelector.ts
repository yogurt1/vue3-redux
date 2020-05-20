import { Store } from 'redux';
import { ref, onUnmounted, Ref } from '@vue/composition-api';
import { getSubForStore } from '../utils/ReduxSub';
import { UseStore } from './useStore';
import { StateOf } from './types';

function defaultCompare(a: unknown, b: unknown): boolean {
  return a === b;
}

export interface Compare<U> {
  (a: U, b: U): boolean;
}

export interface UseSelector<T> {
  <U>(selector: (state: T) => U, compare?: Compare<U>): Ref<Readonly<U>>;
}

export function createUseSelector<T extends Store>(
  useStore: UseStore<T>
): UseSelector<StateOf<T>> {
  return function useSelector(selector, compare = defaultCompare) {
    const store = useStore();
    const sub = getSubForStore(store);
    const selectedStateRef = ref(store.getState());

    function observeState() {
      const selectedState = selector(store.getState());

      if (compare(selectedStateRef.value, selectedState)) {
        return;
      }

      selectedStateRef.value = selectedState;
    }

    sub.addListener(observeState);

    onUnmounted(() => {
      sub.removeListener(observeState);
    });

    return selectedStateRef;
  };
}
