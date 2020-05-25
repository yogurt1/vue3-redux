import { Store } from 'redux';
import { ref, Ref } from '@vue/composition-api';

export class Subscription {
  private _ref: Ref<unknown>;
  private _refCount: number;
  private _store: Store;
  private _unsubscribe: Function | null = null;

  constructor(store: Store) {
    this._store = store;
    this._refCount = 0;
    this._ref = ref(null);
    this._subscriber = this._subscriber.bind(this);
  }

  private _subscriber() {
    this._ref.value = this._store.getState();
  }

  private _runUnsubscribe() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  private _runSubscribe(): void {
    this._runUnsubscribe();
    this._subscriber();
    this._store.subscribe(this._subscriber);
  }

  getRef<T = unknown>(): Readonly<Ref<Readonly<T>>> {
    if (this._refCount === 0) {
      this._runSubscribe();
    }

    this._refCount += 1;
    return this._ref as any;
  }

  releaseRef() {
    this._refCount -= 1;

    if (this._refCount === 0) {
      this._runUnsubscribe();
    }
  }
}
