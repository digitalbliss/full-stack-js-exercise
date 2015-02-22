'use strict';

describe('Directive : FormValidator :', function() {

    var scope, 
        form;

    // load the directive's module
    beforeEach(module('feTestApp'));

    // Initializion
    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    // used by tests to compile the directive 
    function compileDirective() {
        var html = '<form name="form" novalidate form-validator><label>Code</label><input ng-model="code" name="code" required maxlength="6" ng-change="validateInputField(code)"/><span ng-if="didCodeWork">Please enter the 6-digit code.</span><span ng-if="!didCodeWork" class="warning">That code didnt work, please check and try again.</span><button ng-disabled="form.$invalid" ng-click="submit()">Submit</button></form>';
        
        inject(function($compile) {
            form = $compile(html)(scope);
        });
        scope.$digest();
    }   

    describe('input validation', function() {

        beforeEach(function(){
            scope.code = "";
            compileDirective();
        });

        it('should allow submit on 6 digit numbers', function() {

            // button should be disabled with no input
            expect(form.find('button').attr('disabled')).toEqual('disabled');
            scope.code = 123456;
            // workaround to ensure validation is called while testing
            scope.validateInputField(scope.code);
            scope.$digest();
            expect(form.find('button').attr('disabled')).not.toBeDefined();
        });

        it('should not allow submit if non alpha numeric characters exist', function() {
            expect(form.find('button').attr('disabled')).toEqual('disabled');
            scope.code = "123s45";
            scope.validateInputField(scope.code);
            scope.$digest();
            expect(form.find('button').attr('disabled')).toEqual('disabled');
        });

        it('should not allow submit if less than 6 digits', function() {
            expect(form.find('button').attr('disabled')).toEqual('disabled');
            scope.code = 12345;
            scope.validateInputField(scope.code);
            scope.$digest();
            expect(form.find('button').attr('disabled')).toEqual('disabled');
        });
    });
});