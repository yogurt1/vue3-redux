import { ReduxHooks, createHooks } from './hooks/createHooks';
import { mixin } from './mixin';

const {
  provideStore,
  useStore,
  useDispatch,
  useSelector
} = createHooks();

export { provideStore, useStore, useDispatch, useSelector, mixin, ReduxHooks };

