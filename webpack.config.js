const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/, //find all js files, use babel-loader
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" 
                }
            },
            {
                test: /\.html$/, //for all html files use html-loader
                    use: [
                        {
                            loader: "html-loader", 
                            options: {minimize:true}
                        }
                    ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/, //for all image files use file-loader
                    use: [
                        'file-loader'
                    ]
            },
            {
                test: /\.scss$/, 
                    use: [
                        'style-loader', //The style loader takes CSS and actually inserts it into the page so that the styles are active on the page.
                        "css-loader", //The CSS loader takes a CSS file and returns the CSS with imports and url(...) resolved via webpack's require functionality:
                        "sass-loader" //compiles sass to css
                    ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html", //location of our html file
            filename: "./index.html" //output in dist folder
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css" 
        }) //This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    ]
}
