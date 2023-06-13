/**
 * Base store class
 */
export abstract class Store<S> {
  protected abstract defaultState: S;

  /**
   * Base store class constructor
   */
  constructor() {
    this.onInit();
  }

  /**
   * Prebuilt method for handle init event
   *
   * @protected
   */
  protected onInit(): void {
    //
  }
}
