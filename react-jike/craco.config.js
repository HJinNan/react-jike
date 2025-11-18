const path = require('path');
const { whenProd, getPlugin, pluginByName } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'), // 将 @ 指向 src 目录
    },
    // configure: (webpackConfig) => {
    //   // 只在生产环境生效
    //   whenProd(() => {
    //     // 1. 配置不参与打包的外部依赖（key: 包名，value: 全局变量名）
    //     webpackConfig.externals = {
    //       react: 'React', // 对应 window.React
    //       'react-dom': 'ReactDOM' // 对应 window.ReactDOM
    //     };

    //     // 2. CDN 资源配置（生产环境加载外部 CDN 文件）
    //     const cdn = {
    //       js: [
    //         'https://cdn.jsdelivr.net/npm/react@18.1.0/umd/react.production.min.js',
    //         'https://cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.production.min.js'
    //       ]
    //       // 若有 CSS 资源，可添加 css 数组
    //       // css: ['https://xxx.css']
    //     };

    //     // 3. 将 CDN 配置注入到 HtmlWebpackPlugin 中
    //     const { isFound, match } = getPlugin(
    //       webpackConfig,
    //       pluginByName('HtmlWebpackPlugin')
    //     );
    //     if (isFound) {
    //       // 向 html 模板注入 CDN 资源
    //       match.userOptions.cdn = cdn;
    //     }
    //   });

    //   return webpackConfig;
    // },
  }
};