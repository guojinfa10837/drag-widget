const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生产html 文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//请理文件
const webpack = require('webpack');

const config = {
    entry: {
    	/*app:path.join(__dirname, 'src/index.js'),
    	print:path.join(__dirname, 'src/print.js'),*/
    	app:path.join(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath:"/"
    },
    devtool: 'inline-source-map', //错误源

    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:"output management"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()


    ],
    module: {
        rules: [{
          test:/\.css$/,
          use:['style-loader','css-loader']
        },{
          test:/\.(png|jpeg|jpg|gif)$/,
          use:['file-loader']
        },{
          test:/\.(xml)$/,
          use:['xml-loader','csv-loader']
        },{
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },{
          test: /\.scss/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
          loader: 'sass-loader'
          }]
        },{
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".html"]
    }
};

config.devServer = {
   contentBase:'./dist',
   hot:true
};

module.exports = config;