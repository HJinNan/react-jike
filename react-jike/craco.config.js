const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'), // 将 @ 指向 src 目录
    },
  }
};