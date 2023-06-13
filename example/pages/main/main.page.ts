import { component, HTMLTemplateVars, useHtml, render } from '../../../src';
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
