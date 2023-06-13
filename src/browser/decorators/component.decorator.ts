import { ComponentParams } from '../types/common';
import { IComponent } from '../interfaces';

/**
 * Component decorator
 *
 * @param params {ComponentParams} component params
 */
export const component = (params: ComponentParams) => {
  return function <T extends new (...args: any[]) => IComponent>(Constructor: T) {
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args);
        this.template = params.template;
      }
    };
  };
};
