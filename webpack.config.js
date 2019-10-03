
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {

    entry: {
        js: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/bundle-min.js',
    },
    devtool: 'source-map',
    devServer: {
      port: 5001,
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      // stats:"errors-only",
      open: true,
      host: '0.0.0.0',
      useLocalIp: true
        // port: 5000,
        // contentBase: path.resolve(__dirname, 'src')
    },
    
    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    options: { minimize: true }
                  }
                ]
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader?outputStyle=compressed&sourceMap=true'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                //loader: ['file-loader?name=[name].[ext]&outputhPath=media/&publicPath=media/'],
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '../media',
                        outputPath: 'media'                
                    }
                  }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      publicPath: '../fonts',
                      outputPath: 'fonts'
                    }
                  }
                ]
            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: 'css/style-min.css'
        }),

        new HtmlWebpackPlugin({
              template: './src/index.html',
              filename: 'index.html',
              chunks: ['js']
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            chunks: ['js']
        }),
        new HtmlWebpackPlugin({
          template: './src/player.html',
          filename: 'player.html',
          chunks: ['js']
      })
    ]

}