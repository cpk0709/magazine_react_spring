const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/login', {
            target: 'http://3.38.106.41:8080', //접속하려는 서버의 루트 URL
            changeOrigin: true
        })
    );
};