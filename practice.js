const http = require('http');

const routes = require('./practice-routes');

const server = http.createServer(routes);

server.listen(3000);