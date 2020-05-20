import { createHooks } from './hooks/createHooks';

export { mixin } from './mixin';

export { ReduxHooks } from './hooks/createHooks';

export const {
  provideStore,
  useStore,
  useDispatch,
  useSelector
} = createHooks();
