import { Store } from 'redux';

const STORE_SUBS = new WeakMap<Store, ReduxSub>();

// Singleton factory bound to store instance
export function getSubForStore(store: Store): ReduxSub {
  if (!STORE_SUBS.has(store)) {
    const sub = new ReduxSub(store);
    STORE_SUBS.set(store, sub);
  }

  return STORE_SUBS.get(store)!;
}

export class ReduxSub {
  #store: Store;
  #listeners: Set<Function>;
  #unsubscribe: Function | null = null;

  constructor(store: Store) {
    this.#store = store;
    this.#listeners = new Set();
  }

  addListener(listener: Function) {
    this.#listeners.add(listener);

    // first subscription - subscribe to store
    if (this.#listeners.size === 1 && !this.#unsubscribe) {
      this.#unsubscribe = this.#store.subscribe(() => {
        this.#listeners.forEach(listener => {
          listener();
        });
      });
    }
  }

  removeListener(listener: Function) {
    this.#listeners.delete(listener);

    // last unsubscribed, unsubscribe from store
    if (this.#listeners.size === 0 && this.#unsubscribe) {
      this.#unsubscribe();
      this.#unsubscribe = null;
    }
  }
}
