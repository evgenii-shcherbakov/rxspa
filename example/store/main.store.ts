import { IMainState, IMainStore } from '../shared/interfaces';
import { StoreKey } from '../shared/enums';
import { DEFAULT_MAIN_STATE } from '../shared/defaults';
import { IStream, Store, Stream } from '../../src';

export default class MainStore extends Store<IMainState> implements IMainStore {
  protected defaultState: IMainState = DEFAULT_MAIN_STATE;

  first: IStream<number> = new Stream<number>(DEFAULT_MAIN_STATE.first, StoreKey.MainFirst);

  second: IStream<number> = new Stream<number>(DEFAULT_MAIN_STATE.second, StoreKey.MainSecond);

  reset(): void {
    this.first.value = this.defaultState.first;
    this.second.value = this.defaultState.second;
  }
}
