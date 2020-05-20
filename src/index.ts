import { ReduxHooks, createHooks } from './hooks/createHooks';
import { createMixin, mixin } from './mixin';

// default hooks
const {
  provideStore,
  useStore,
  useDispatch,
  useSelector
} = createHooks();

export {
  mixin,
  createMixin,
  createHooks,
  ReduxHooks,
  provideStore,
  useStore,
  useDispatch,
  useSelector,
};
