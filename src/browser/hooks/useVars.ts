import { CssVars } from '../types/common';

/**
 * Hook for apply css vars to root html element
 *
 * @param vars {CssVars} Css vars
 */
export const useVars = (vars: CssVars = {}): void => {
  Object.keys(vars).forEach((key: string) => {
    document.documentElement.style.setProperty(key, vars[key]);
  });
};
