import { PageClass } from './classes';

export type HTMLTemplateVars = {
  [property: string]: string | number | boolean;
};

export type CssVars = {
  [property: string]: string;
};

export type Pages<Context> = {
  [property: string]: PageClass<Context>;
};

export type AppConfig<Context> = {
  root: HTMLElement;
  entry: PageClass<Context>;
  pages: Pages<Context>;
  modals: Pages<Context>;
};

export type ComponentParams = {
  template: string;
};

export type Action<Payload> = (value: Payload) => void;
