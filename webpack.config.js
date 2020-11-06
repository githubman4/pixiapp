
const path = require('path')

const output_path = "output";
// mainプロセス用

const main = {
    //electron ターゲット
    target: 'electron-main',

    // mode: 'production',
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        main: "./src/main/main.entry.ts",
    },

    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: path.join(__dirname, output_path),
        // 出力ファイル名
        filename: "[name].js"
    },
    node: {
        __dirname: false,
        __filename: false
    },

    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [".js", ".ts"]
    },
    watch: true

};


//renderer用
const renderer = {
    //electron ターゲット
    target: 'electron-renderer',

    // mode: 'production',
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        index: "./src/renderer/index.entry.ts",
        page2: "./src/renderer/page2.entry.ts",
        
    },

    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: path.join(__dirname, output_path),
        // 出力ファイル名
        filename: "[name].js"
    },


    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [".js", ".ts"]
    },
    watch: true

};

module.exports = [main, renderer];
