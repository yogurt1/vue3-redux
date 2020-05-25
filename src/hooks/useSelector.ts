import { Store } from 'redux';
import { ref, onUnmounted, Ref, computed, watch } from '@vue/composition-api';
import { Subscription } from '../utils/Subscription';
import { UseStore } from './useStore';
import { StateOf } from './types';

const SUBS_MAP: WeakMap<Store, Subscription> = new WeakMap();

function getSubscription(store: Store): Subscription {
  const lastSubscription = SUBS_MAP.get(store);

  if (lastSubscription) {
    return lastSubscription;
  }

  const subscription = new Subscription(store);
  SUBS_MAP.set(store, subscription);
  return subscription;
}

function defaultCompare(a: unknown, b: unknown): boolean {
  return a === b;
}

export interface Compare<U> {
  (a: U, b: U): boolean;
}

export interface UseSelector<T> {
  <U>(selector: (state: T) => U, compare?: Compare<U>): Readonly<
    Ref<Readonly<U>>
  >;
}

export function createUseSelector<T extends Store>(
  useStore: UseStore<T>
): UseSelector<StateOf<T>> {
  return function useSelector(selector, compare = defaultCompare) {
    const store = useStore();
    const sub = getSubscription(store);
    const stateRef = sub.getRef();
    const selectedStateRef = computed(() => selector(stateRef.value as any));
    const optimizedSelectedStateRef = ref(selectedStateRef.value);

    watch(selectedStateRef, (selectedState, prevSelectedState) => {
      if (!compare(selectedState, prevSelectedState)) {
        optimizedSelectedStateRef.value = selectedState as any;
      }
    });

    onUnmounted(() => {
      sub.releaseRef();
    });

    return selectedStateRef;
  };
}
