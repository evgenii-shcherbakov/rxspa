import { IApplication, IComponent } from '../interfaces';

/**
 * Helper for start application.
 * Launches app bootstrap method
 *
 * @param app { IApplication } instance of application class
 */
export function bootstrap(app: IApplication) {
  app.bootstrap();
}

/**
 * Helper for inject component into Node
 * Launches component render method and returns generated Node (HTMLElement)
 *
 * @param component {Component} instance of class Component or its child class
 * @returns {HTMLElement}
 */
export function render(component: IComponent) {
  return component.render();
}
