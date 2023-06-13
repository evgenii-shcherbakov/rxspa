import { IPage, IRouter } from '../interfaces';

export type PageClass<Context> = new (router: IRouter, context: Context) => IPage;
