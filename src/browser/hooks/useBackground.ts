/**
 * Hook for add lazy load backgroundImage to HTMLElement
 *
 * @param el {HTMLElement}
 * @param src {string}
 */
export const useBackground = (el: HTMLElement, src: string): void => {
  const img: HTMLImageElement = new Image();
  const element = el;

  img.src = src;
  img.onload = () => {
    element.style.backgroundImage = `url("${src}")`;
  };
};
