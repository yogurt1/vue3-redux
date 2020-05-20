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
  private _store: Store;
  private _listeners: Set<Function>;
  private _unsubscribe: Function | null = null;

  constructor(store: Store) {
    this._store = store;
    this._listeners = new Set();
  }

  addListener(listener: Function) {
    this._listeners.add(listener);

    // first subscription - subscribe to store
    if (this._listeners.size === 1 && !this._unsubscribe) {
      this._unsubscribe = this._store.subscribe(() => {
        this._listeners.forEach(listener => {
          listener();
        });
      });
    }
  }

  removeListener(listener: Function) {
    this._listeners.delete(listener);

    // last unsubscribed, unsubscribe from store
    if (this._listeners.size === 0 && this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }
}
