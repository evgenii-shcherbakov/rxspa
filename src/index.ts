import { component } from './browser/decorators/component.decorator';
import { log } from './browser/decorators/log.decorator';
import { Application } from './browser/entities/application';
import { Component } from './browser/entities/component';
import { Modal } from './browser/entities/modal';
import { Page } from './browser/entities/page';
import { Router } from './browser/entities/router';
import { Store } from './browser/entities/store';
import { Stream } from './browser/entities/stream';
import { useBackground } from './browser/hooks/useBackground';
import { useHtml } from './browser/hooks/useHtml';
import { useVars } from './browser/hooks/useVars';
import { IApplication, IComponent, IObserver, IPage, IRouter, IStream } from './browser/interfaces';
import { PageClass } from './browser/types/classes';
import {
  Action,
  AppConfig,
  ComponentParams,
  CssVars,
  HTMLTemplateVars,
  Pages,
} from './browser/types/common';
import { bootstrap, render } from './browser/utils';

export {
  component,
  log,
  Application,
  Component,
  Modal,
  Page,
  Router,
  Store,
  Stream,
  useBackground,
  useHtml,
  useVars,
  IApplication,
  IComponent,
  IObserver,
  IPage,
  IRouter,
  IStream,
  PageClass,
  Action,
  AppConfig,
  ComponentParams,
  CssVars,
  HTMLTemplateVars,
  Pages,
  bootstrap,
  render,
};
