'use strict';

angular.module('feTestApp').factory('webService', ['$http',
    function($http) {

        var webServiceInstance = {},
            url = 'http://localhost:8888/';

        // makes the POST request and returns the response
        // request failure isn't handled as it was not mentioned in spec
        webServiceInstance.postCode = function(value, inputUrl) {
            
            return $http({
                method: 'post',
                url: inputUrl ? inputUrl : url,
                data: {
                    code: value
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                return data;
            });
        };

        // Basic validation of response
        webServiceInstance.validateResponse = function(data) {

            if (data.errorcode === 901) {
                console.error(data.error);

                return false;
            } else {

                return true;
            }
        };

        return webServiceInstance;
    }
]);