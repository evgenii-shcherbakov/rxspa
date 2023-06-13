import template from './button.component.html';
import './button.component.scss';
import { ButtonProps } from '../../shared/props';
import { AppComponent } from '../../app';
import { component, HTMLTemplateVars } from '../../../src';

@component({ template })
export default class ButtonComponent extends AppComponent {
  constructor(private readonly PROPS: ButtonProps) {
    super();
    this.PROPS = PROPS;
  }

  protected vars(): HTMLTemplateVars {
    return {
      title: this.PROPS.title,
      className: this.PROPS.className || '',
    };
  }

  protected handleEvents() {
    this.node.addEventListener('click', () => this.PROPS.onClick());
  }
}
