import { IStream } from '../interfaces';
import { Action } from '../types/common';

/**
 * Base stream class
 */
export class Stream<T> implements IStream<T> {
  protected actions: Action<T>[] = [];

  /**
   * Base stream constructor
   *
   * @param _value stream value
   * @param storeKey {string | undefined} local storage key (for auto save, optional)
   */
  public constructor(private _value: T, private readonly storeKey?: string) {
    this.storeKey = storeKey;
    this._value = this.load() || _value;
  }

  /**
   * Stream value getter
   */
  public get value(): T {
    return this._value;
  }

  /**
   * Stream value setter
   *
   * @param val new value
   */
  public set value(val: T) {
    this._value = val;
    this.actions.forEach((action: Action<T>) => action(this._value));

    if (this.storeKey) {
      localStorage.setItem(this.storeKey, JSON.stringify(this._value));
    }
  }

  /**
   * Method for subscribe observer
   *
   * @param action action, which will triggered after change value
   */
  public subscribe(action: Action<T>): void {
    this.actions.push(action);
  }

  /**
   * Method for unsubscribe subscribed action
   *
   * @param action action
   */
  public unsubscribe(action: Action<T>): void {
    this.actions = this.actions.filter((act: Action<T>) => act !== action);
  }

  /**
   * Method for load saved in ls stream value
   *
   * @protected
   */
  protected load(): T | null {
    return this.storeKey && localStorage.getItem(this.storeKey)
      ? JSON.parse(localStorage.getItem(this.storeKey) as string)
      : null;
  }
}
