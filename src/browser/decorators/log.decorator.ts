/**
 * Log decorator
 *
 * @param message {string | undefined} output message
 */
export const log = (message?: string) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const stock = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(message || propertyKey);
      return stock.apply(this, args);
    };
  };
};
