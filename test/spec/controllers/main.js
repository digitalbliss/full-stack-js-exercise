'use strict';

describe('Controller: MainCtrl', function() {

    var mainController,
        scope,
        webService;

    // load the controller's module
    beforeEach(module('feTestApp'));

    // initialization
    beforeEach(inject(function($controller, $rootScope, $q, _webService_) {
        scope = $rootScope.$new();
        mainController = $controller('MainCtrl', {
            $scope: scope
        });
        webService = _webService_;
        // monitor the webService to see if the controller calls it
        spyOn(webService, 'postCode').and.callThrough();
        spyOn(webService, 'validateResponse').and.callThrough();
    }));

    it('should attach didCodeWork to the scope', function() {
        expect(scope.didCodeWork).toBe(true);
    });

    it('should call the webService on submit with code', function() {
        scope.code = 123456;
        scope.submit();
        expect(webService.postCode).toHaveBeenCalledWith(scope.code);
    });
});