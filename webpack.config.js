const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    //donde se guarda el resultado
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //nombre archivo resultante
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        //identificar archivos js y jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //no se necesita leer node modules porque tiene muchos archivos js y jsx y puede generar problemas al compilar el proyecto
        use: {
          loader: 'babel-loader',
        },
      },
      {
        //identificar archivos html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        //identificar archivos css
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', //inicio html
      filename: './index.html', //archivo que se enviará cuando termine la configuración
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3005,
    open: true,
  },
};
