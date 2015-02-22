var request = require('request');
var server = require('../server');

describe('Test Server', function() {
    
    // start the server before each test
    beforeEach(function() {
        server.start();
    });

    // close the server after each test
    afterEach(function() {
        server.close();
    });

    it('should respond with hello world to get', function(done) {
        request('http://localhost:8888/hello', function(error, response, body) {
            expect(body).toEqual('Hello World');
            done();
        });
    });

    it('should return error code to post', function(done) {

        var url = 'http://localhost:8888/';
        var params = {
            url: url,
            form: {
                'code': '123456'
            }
        };
        request.post(params, function(err, resp, body) {
            expect(resp.statusCode).toEqual(200);
            expect(body).toContain('901');
            expect(body).toContain('invalid code');
            done();
        });
    });
});