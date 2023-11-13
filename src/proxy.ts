const target = 'https://api.jdoodle.com'; // Replace with the URL of your API server
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = {
  '/api': {
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove the '/api' path segment
    },
  },
};

module.exports = proxyConfig;
