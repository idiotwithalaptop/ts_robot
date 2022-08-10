import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env): Configuration => ({
  entry: "./src/web/app/index.tsx",
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /dist/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/web/public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.production || !env.development,
      "process.env.NAME": JSON.stringify(require("../../package.json").name),
      "process.env.VERSION": JSON.stringify(
        require("../../package.json").version
      ),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/web/app/**/*.{ts,tsx,js,jsx}",
      },
    }),
  ],
});

export default webpackConfig;
