'use strict';

angular.module('feTestApp')
  .controller('MainCtrl', ['$scope', 'webService', function ($scope, webService) {
    
    // used to hide/display the error message
    $scope.didCodeWork = true;

    // called when the form is submitted
    // uses the webService to make the post request
    // updates status according to response
    $scope.submit = function () {
        webService.postCode($scope.code).success(function(response) {
            $scope.didCodeWork = webService.validateResponse(response);
        }).error(function(response) {
            $scope.didCodeWork = false;
        });
    };
}]);