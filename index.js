const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/gstatic', createProxyMiddleware({
    target: "http://fonts.gstatic.com",
    changeOrigin: true,
    pathRewrite: {'^/gstatic' : ''}
}))

app.use('/', createProxyMiddleware({
    target: "http://fonts.googleapis.com",
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        const response = responseBuffer.toString('utf8'); // convert buffer to string
        return response.replaceAll('http://fonts.gstatic.com', 'https://fonts.buhrmi.de/gstatic'); // manipulate response and return the result
    }),
}))

app.listen(PORT, () => {
    console.log(`Proxy server listening at port number:${PORT}`);
})