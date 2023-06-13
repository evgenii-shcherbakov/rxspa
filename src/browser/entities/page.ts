import { Component } from './component';
import { IObserver, IPage, IRouter } from '../interfaces';

/**
 * Base page class
 */
export abstract class Page<Context> extends Component implements IPage, IObserver {
  protected readonly activeClass = 'active';
  protected readonly prevClass = 'anim-prev';
  protected readonly nextClass = 'anim-next';

  /**
   * Page constructor
   *
   * @param router app router
   * @param context app context
   * @protected
   */
  public constructor(protected readonly router: IRouter, protected readonly context: Context) {
    super();
  }

  /**
   * Prebuilt method for open this page
   */
  public open(): void {
    const { node, activeClass, prevClass } = this;

    node.classList.add(activeClass, prevClass);
    node.addEventListener('animationend', () => {
      node.classList.remove(prevClass);
    });
  }

  /**
   * Prebuilt method for close this page
   */
  public close(): void {
    const { node, nextClass } = this;
    node.classList.add(nextClass);
    node.addEventListener('animationend', () => {
      this.onDestroy();
      node.remove();
    });
  }

  /**
   * Prebuilt method for handle destroy event
   */
  public onDestroy(): void {
    //
  }
}
