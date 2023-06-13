export interface IApplication {
  bootstrap(): void;
}

export interface IRouter {
  openPage(id: string): void;
  openModal(id: string): void;
  getRootContainer(): HTMLElement;
}

export interface IComponent {
  template: string;
  render(): HTMLElement;
}

export interface IPage extends IComponent {
  open(): void;
  close(): void;
}

export interface IObserver {
  onDestroy(): void;
}

export interface IStream<T> {
  value: T;
  subscribe(action: (value: T) => void): void;
  unsubscribe(action: (value: T) => void): void;
}
