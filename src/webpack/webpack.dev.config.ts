import merge from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackConfig, WebpackParams } from './types';

export const webpackDevConfig = (params: WebpackParams): WebpackConfig => {
  return merge(webpackBaseConfig(params), {
    devServer: {
      open: true,
      hot: true,
      compress: true,
      watchFiles: params.watchFiles ?? [],
    },
    mode: 'development',
    devtool: 'source-map',
    output: { filename: 'js/[name].js' },
    plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].css' })],
  });
};
