import { ReduxHooks, createHooks } from './hooks/createHooks';
import { mixin } from './mixin';

// default hooks
const {
  provideStore,
  useStore,
  useDispatch,
  useSelector
} = createHooks();

export {
  mixin,
  createHooks,
  ReduxHooks,
  provideStore,
  useStore,
  useDispatch,
  useSelector,
};
