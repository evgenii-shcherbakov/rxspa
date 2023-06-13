import { Configuration } from 'webpack';
import { Configuration as IDevServer } from 'webpack-dev-server';

export type WebpackConfig = Configuration & {
  devServer?: IDevServer;
};

export type WebpackParams = {
  entry: string;
  output: string;
  htmlEntry: string;
  favicon: string;
  watchFiles?: string[];
};
