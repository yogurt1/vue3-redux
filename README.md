# Vue3-Redux bindings

![CI](https://github.com/yogurt1/vue3-redux/workflows/CI/badge.svg)

## public api

- `provideStore(store)` - provide redux store
- `useStore()` - inject provided store
- `useDispatch()` - inject dispatch method of injected store
- `useSelector(selector, compare?)` - select state (check `react-redux`)
- `createHooks()` - create namespaced hooks (or for typing)
- `mixin` - Mixin from options

## TypeScript

Use `createHooks<T>()` for typed hooks creation

Check `d.ts` for API types

## TODO:

- [ ] Internally uses *@vue/composition-api*, after Vue.3 need to migrate to *@vue/reactive*
