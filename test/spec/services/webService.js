'use strict';

describe('Service : WebService : ', function() {

    var webService,
        mockServer,
        code, 
        url;

    beforeEach(module('feTestApp'));

    // initialization
    beforeEach(inject(function(_webService_, $httpBackend) {
        webService = _webService_;
        mockServer = $httpBackend;
        code = '123456';
        url = 'http://localhost:8888/';
    }));

    it('should make a POST request with the input code', function() {
        
        mockServer.expectPOST(url, function(data) {
            return JSON.parse(data).code === code;
        }).respond(200,'');

        webService.postCode(code, url);
        mockServer.flush();
    });

    it('should make a POST request and return the response data', function() {
        var responseData = "A test response";
        mockServer.whenPOST(url).respond(responseData);
        
        webService.postCode(code, url).then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(responseData);
        });
        mockServer.flush();
    });

});