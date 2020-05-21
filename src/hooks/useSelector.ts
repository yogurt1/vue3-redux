import { Store } from 'redux';
import { ref, onUnmounted, Ref, computed } from '@vue/composition-api';
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
    const recomputeTrigger = ref(false);
    const store = useStore();

    let lastSelectedState = selector(store.getState());

    function observeState() {
      const prevSelectedState = lastSelectedState;
      lastSelectedState = selector(store.getState());

      if (!compare(prevSelectedState, lastSelectedState)) {
        recomputeTrigger.value = !recomputeTrigger.value;
      }
    }

    const sub = getSubForStore(store);

    sub.addListener(observeState);

    onUnmounted(() => {
      sub.removeListener(observeState);
    });

    return computed(() => {
      // trigger recompute
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      recomputeTrigger.value;
      return lastSelectedState;
    });
  };
}
