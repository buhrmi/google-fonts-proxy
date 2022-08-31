const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

const API_SERVICE_URL = "http://fonts.googleapis.com";

app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true
}));

app.listen(PORT, () => {
    console.log(`Proxy server listening at port number:${PORT}`);
});