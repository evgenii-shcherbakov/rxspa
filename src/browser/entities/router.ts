import { IRouter } from '../interfaces';

/**
 * Base router class
 */
export class Router implements IRouter {
  /**
   * Base router constructor
   *
   * @param openPage callback for open page
   * @param openModal callback for open modal
   * @param rootContainer {HTMLElement} app root element
   */
  public constructor(
    public openPage: (id: string) => void,
    public openModal: (id: string) => void,
    private readonly rootContainer: HTMLElement,
  ) {
    this.openPage = openPage;
    this.openModal = openModal;
    this.rootContainer = rootContainer;
  }

  /**
   * Method for get app root element from component
   */
  public getRootContainer(): HTMLElement {
    return this.rootContainer;
  }
}
