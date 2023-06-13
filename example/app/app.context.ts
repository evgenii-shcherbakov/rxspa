import { AppContext } from '../shared/types';
import { mainStore } from '../store';

const appContext: AppContext = {
  main: mainStore,
};

export default appContext;
