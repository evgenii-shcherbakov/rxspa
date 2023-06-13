import { IStream } from '../../src';

export interface IMainState {
  first: number;
  second: number;
}

export interface IMainStore {
  first: IStream<number>;
  second: IStream<number>;
  reset(): void;
}
