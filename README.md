# rxspa
Reactive SPA framework

[![npm version](https://img.shields.io/npm/v/rxspa.svg)](https://npmjs.org/package/rxspa)
[![npm license](https://img.shields.io/npm/l/rxspa.svg)](https://npmjs.org/package/rxspa)
[![npm type definitions](https://img.shields.io/npm/types/rxspa)](https://npmjs.org/package/rxspa)

My first framework, created at November 2021, when I worked on some tasks at Rolling Scopes School.
One of the requirements for the tasks in those courses was the prohibition of using frontend frameworks, 
which led to the appearance of this one in order to circumvent this restriction (nobody forbade using 
their own frameworks :)) The codebase is preserved in its original form, except edits necessary for 
publishing and using modern assembly methods and CI

### Installation

Install package:

```shell
npm install rxspa
```

Add `"experimentalDecorators": true` setting to your `tsconfig.json`

### Setup

First, declare type of application context, using Store classes

```typescript
import { IStream } from 'rxspa';

export interface IMainState {
  first: number;
  second: number;
}

export interface IMainStore {
  first: IStream<number>;
  second: IStream<number>;
  reset(): void;
}
```

```typescript
import { IMainState, IMainStore } from '../shared/interfaces';
import { StoreKey } from '../shared/enums';
import { DEFAULT_MAIN_STATE } from '../shared/defaults';
import { IStream, Store, Stream } from 'rxspa';

export default class MainStore extends Store<IMainState> implements IMainStore {
  protected defaultState: IMainState = DEFAULT_MAIN_STATE;

  first: IStream<number> = new Stream<number>(DEFAULT_MAIN_STATE.first, StoreKey.MainFirst);

  second: IStream<number> = new Stream<number>(DEFAULT_MAIN_STATE.second, StoreKey.MainSecond);

  reset(): void {
    this.first.value = this.defaultState.first;
    this.second.value = this.defaultState.second;
  }
}
```

```typescript
import { IMainStore } from './interfaces';

export type AppContext = {
  main: IMainStore;
};
```

Then declare app configuration object

```typescript
import { AppConfig } from 'rxspa';
import { AppContext } from '../shared/types';
import { MainPage } from '../pages';

const appConfig: AppConfig<AppContext> = {
  entry: MainPage,
  modals: {},
  pages: {
    main: MainPage,
  },
  root: document.body,
};

export default appConfig;
```

Declare app class

```typescript
import { Application } from 'rxspa';
import { AppContext } from '../shared/types';

export default class App extends Application<AppContext> {
  // Declare additional logic, if needed
}
```

Declare base Page, Modal, Component class (if need)

```typescript
import { Page } from 'rxspa';
import { AppContext } from '../shared/types';

export default class AppPage extends Page<AppContext> {
  // Declare additional logic, if needed
}
```

```typescript
import { Modal } from 'rxspa';
import { AppContext } from '../shared/types';

export default class AppModal extends Modal<AppContext> {
  // Declare additional logic, if needed
}

```

```typescript
import { Component } from 'rxspa';

export default class AppComponent extends Component {
  // Declare additional logic, if needed
}
```

Use bootstrap function in your application main file for launch

```typescript
import { bootstrap } from 'rxspa';
import { App, appConfig, appContext } from './app';

bootstrap(new App(appConfig, appContext));
```

### Usage

##### Page

main.page.html:

```handlebars
<div>
  <h2>{{ title }}</h2>
  <div class="component"></div>
</div>
```

main.page.scss:

```css
/* any scss-code or css-code */
```

main.page.ts:

```typescript
import { component, HTMLTemplateVars, useHtml, render } from 'rxspa';
import template from './main.page.html';
import './main.page.scss';
import CardComponent from '../../components/card/card.component';
import { AppPage } from '../../app';
import { HELLO_WORD } from '../../shared/constants';

@component({ template })
export default class MainPage extends AppPage {
  private card: CardComponent | null = null;

  protected vars(): HTMLTemplateVars {
    return { title: HELLO_WORD };
  }

  protected onInit() {
    this.card = new CardComponent(this.router, this.context);
  }

  protected inject() {
    this.node.append(useHtml('<strong>React-style component</strong>'));

    if (this.card) {
      this.node.querySelector('.component')?.append(render(this.card));
    }
  }

  onDestroy() {
    this.card?.onDestroy();
  }
}
```

##### Component

card.component.html:

```handlebars
<p>
    <span class="first">{{ first }}</span>
    <br />
    <span class="second">{{ second }}</span>
    <br />
</p>
```

card.component.scss:

```css
/* any scss-code or css-code */
```

card.component.ts:

```typescript
import { component, render, HTMLTemplateVars } from 'rxspa';
import template from './card.component.html';
import { AppPage } from '../../app';
import './card.component.scss';
import { BtnText } from '../../shared/enums';
import ButtonComponent from '../button/button.component';

@component({ template })
export default class CardComponent extends AppPage {
  private firstSpan: HTMLSpanElement = document.createElement('span');
  private secondSpan: HTMLSpanElement = document.createElement('span');

  protected vars(): HTMLTemplateVars {
    return {
      first: this.context.main.first.value,
      second: this.context.main.second.value,
    };
  }

  private updateFirst(value: number): void {
    this.firstSpan.textContent = value.toString();
  }

  private updateSecond(value: number): void {
    this.secondSpan.textContent = value.toString();
  }

  protected onInit() {
    this.context.main.first.subscribe(this.updateFirst.bind(this));
    this.context.main.second.subscribe(this.updateSecond.bind(this));
  }

  protected bindElements() {
    this.firstSpan = this.node.querySelector<HTMLSpanElement>('.first') || this.firstSpan;
    this.secondSpan = this.node.querySelector<HTMLSpanElement>('.second') || this.secondSpan;
  }

  protected inject() {
    this.node.append(
      render(
        new ButtonComponent({
          title: BtnText.IncFirst,
          onClick: () => {
            this.context.main.first.value += 1;
          },
        }),
      ),
      render(
        new ButtonComponent({
          title: BtnText.IncSecond,
          onClick: () => {
            this.context.main.second.value += 1;
          },
        }),
      ),
      render(
        new ButtonComponent({
          title: BtnText.Reset,
          onClick: () => this.context.main.reset(),
        }),
      ),
    );
  }

  onDestroy() {
    this.context.main.first.unsubscribe(this.updateFirst.bind(this));
    this.context.main.second.unsubscribe(this.updateSecond.bind(this));
  }
}
```

##### Webpack configuration

You can use out-box webpack configuration helpers, as in example below:

```typescript
import { join } from 'path';
import { WebpackConfig, WebpackParams, webpackDevConfig, webpackProdConfig } from 'rxspa/webpack';

const isProduction = process.env.NODE_ENV === 'production';

const webpackParams: WebpackParams = {
  entry: join(__dirname, 'src', 'main.ts'),
  output: join(__dirname, 'build'),
  htmlEntry: join(__dirname, 'public', 'index.html'),
  favicon: join(__dirname, 'public', 'favicon.ico'),
  watchFiles: [join(__dirname, 'src')],
};

const webpackConfig: WebpackConfig = (isProduction ? webpackProdConfig : webpackDevConfig)(
  webpackParams,
);

export default webpackConfig;
```

### Examples

[Complete example](example)
