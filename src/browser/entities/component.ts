import { useHtml } from '../hooks/useHtml';
import { HTMLTemplateVars } from '../types/common';
import { IComponent } from '../interfaces';

/**
 * Base component class
 */
export abstract class Component implements IComponent {
  public template = '<div></div>';
  protected node: HTMLElement = document.createElement('div');

  protected vars(): HTMLTemplateVars {
    return {};
  }

  /**
   * Method for compile component from template
   *
   * @protected
   */
  protected compile(): void {
    this.node = useHtml(this.template, this.vars());
  }

  /**
   * Prebuilt method for init component (subscribe subjects, declare children, etc.)
   *
   * @protected
   */
  protected onInit(): void {
    //
  }

  /**
   * Prebuilt method for binding
   *
   * @protected
   */
  protected bindElements(): void {
    //
  }

  /**
   * Prebuilt method for add dynamic content to element
   *
   * @protected
   */
  protected inject(): void {
    //
  }

  /**
   * Prebuilt method for handle component events
   *
   * @protected
   */
  protected handleEvents(): void {
    //
  }

  /**
   * Prebuilt method for render component
   */
  public render(): HTMLElement {
    this.compile();
    this.onInit();
    this.bindElements();
    this.inject();
    this.handleEvents();
    return this.node;
  }
}
