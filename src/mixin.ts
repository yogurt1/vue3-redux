import Vue, { ComponentOptions } from 'vue';

/**
 * Vue 2.x-style api
 */

export function createMixin<V extends Vue = Vue>({
  optionsKey,
  instanceKey
}: {
  optionsKey: string,
  instanceKey: string
}): ComponentOptions<V> {
  return {
    beforeCreate() {
      Object.defineProperty(this, instanceKey, {
        configurable: false,

        get() {
          // store injection
          const store = this.$options[optionsKey] ?? this.$parent?.[instanceKey];

          if (!store) {
            throw new Error('store should be provided');
          }

          return store;
        }
      })
    }
  }
}

export const mixin = createMixin<any>({
  optionsKey: 'store',
  instanceKey: '$store',
});