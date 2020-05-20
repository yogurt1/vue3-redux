import Vue from 'vue';

/**
 * Vue 2.x-style api
 */

export function mixin(_Vue: typeof Vue): void {
  _Vue.mixin({
    beforeCreate(this: any) {
      // store injection
      const store = this.$options.store ?? this.$parent?.$store;

      if (!store) {
        throw new Error('store should be provided');
      }

      this.$store = store;
    },
  });
}
