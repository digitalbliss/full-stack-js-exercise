'use strict';

angular.module('feTestApp').directive('formValidator',
    function() {

        var isInputValid;

        // validates that input is a 6 digit number 
        // returns true on success false otherwise.
        isInputValid = function(input) {
            var regex = /(^\d{6}$)/g;
            return regex.test(input);
        };

        return {

            link: function(scope) {
                // used by the form to validate the input
                scope.validateInputField = function(code) {

                    if (isInputValid(code)) {
                        scope.form.code.$setValidity('code', true);
                    } else {
                        scope.form.code.$setValidity('code', false);
                    }
                };
            }
        };
    }
);