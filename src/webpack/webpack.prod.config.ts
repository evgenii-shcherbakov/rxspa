import merge from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackBaseConfig } from './webpack.base.config';
import { WebpackConfig, WebpackParams } from './types';

export const webpackProdConfig = (params: WebpackParams): WebpackConfig => {
  return merge(webpackBaseConfig(params), {
    mode: 'production',
    optimization: { minimizer: [new CssMinimizerPlugin(), new TerserPlugin()] },
    output: { filename: 'js/[name].[contenthash].js' },
    plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })],
  });
};
