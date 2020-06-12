const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
   entry:{
   	 app:path.join(__dirname, 'src/index.js')
   },
   plugins:[
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({"title":"production"})
   ],
   output:{
   	 path:path.resolve(__dirname,'dist'),
   	 filename: '[name].bundle.js'
   },
   module: {
        rules: [
          {
            test: require.resolve('jquery'),
            use: [
                {
                    loader: 'expose-loader',
                    options: '$'
                },
                {
                    loader: 'expose-loader',
                    options: 'jQuery'
                }
            ]
        },
        {
          test: /\.art$/,
          loader: "art-template-loader",
          options: {
              // art-template options (if necessary)
              // @see https://github.com/aui/art-template
          }
        },
        {
          test: path.join(__dirname, 'es6'),
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },{
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
        }]
    }
};

module.exports = config;