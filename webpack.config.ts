import { join } from 'path';
import { WebpackConfig, WebpackParams, webpackDevConfig, webpackProdConfig } from './src/webpack';

const isProduction = process.env.NODE_ENV === 'production';

const webpackParams: WebpackParams = {
  entry: join(__dirname, 'example', 'main.ts'),
  output: join(__dirname, 'build'),
  htmlEntry: join(__dirname, 'public', 'index.html'),
  favicon: join(__dirname, 'public', 'favicon.ico'),
  watchFiles: [join(__dirname, 'example'), join(__dirname, 'src/browser')],
};

const webpackConfig: WebpackConfig = (isProduction ? webpackProdConfig : webpackDevConfig)(
  webpackParams,
);

export default webpackConfig;
