
//设置代理

const createProxyMiddleware = require('http-proxy-middleware');
//这里貌似不用加花括号(版本问题：1.0.0后需要加，0.x的版本不需要)，会报错not a function

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/account', { target: 'http://localhost:8081' }),
    createProxyMiddleware('/vote', { target: 'http://localhost:8081' }),
    createProxyMiddleware('/realtime-voteinfo', { target: 'ws://localhost:8081', ws: true }),
  );
};


// (pathname, req) => {
//   // console.log(req)
//   if (!req.headers.accept) {
//     return false
//   }
//   if (req.headers.accept == ('*/*')) {
//     return false
//   }
//   return !req.headers.accept.includes('text/html')
// },