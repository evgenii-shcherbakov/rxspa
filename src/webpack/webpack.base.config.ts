import HtmlPlugin from 'html-webpack-plugin';
import { CleanPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackConfig, WebpackParams } from './types';

export const webpackBaseConfig = (params: WebpackParams): WebpackConfig => {
  return {
    entry: params.entry,
    target: ['web', 'es6'],
    output: {
      path: params.output,
      assetModuleFilename: '[file]',
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.ts$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(?:mp3|wav|ogg|mp4)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(?:woff(2)|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: params.htmlEntry,
        filename: './index.html',
        favicon: params.favicon,
      }),
      new CleanPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.ts'],
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 1000000000,
      maxEntrypointSize: 1000000000,
    },
  };
};
