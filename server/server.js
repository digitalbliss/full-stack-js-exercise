var http = require('http');
var server;

// exporting start and close to make it possible to start/close server from 
// the tests.
exports.start = function(config, readyCallback) {

    if (!server) {

        server = http.createServer(function(request, response) {

            // takes as input headers and sets them to allow for CORS
            function setCORSHeaders(headers) {
                headers['Access-Control-Allow-Origin'] = '*';
                headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
                headers['Access-Control-Allow-Credentials'] = false;
                headers['Access-Control-Max-Age'] = '86400'; // 24 hours
                headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
            }

            // on get return Hello World
            if (request.method === 'GET') {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('Hello World');
                response.end();
            } else if (request.method === 'OPTIONS') {

                var headers = {};
                setCORSHeaders(headers);
                response.writeHead(200, headers);
                response.end();
            } else if (request.method === 'POST') {

                request.on('data', function() {

                    var headers = {};
                    setCORSHeaders(headers);
                    headers['Content-Type'] = 'application/json';
                    response.writeHead(200, headers);
                    response.write('{"errorcode": 901,"error": "invalid code"}');
                    response.end();
                });
            } else {
                response.writeHead(405, 'Method Not Supported', {
                    'Content-Type': 'text/html'
                });
                return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
            }
        }).listen(8888);
    }
};

exports.close = function() {
    server.close();
};