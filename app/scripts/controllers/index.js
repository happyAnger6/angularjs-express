var app = angular.module('myapp', ['myMod', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'IndexController',
        templateUrl:'/views/index.html'
    }).when('/example1', {
        controller: 'controllerA',
        templateUrl:'/views/example1.html'
    })
    .otherwise({redirectTo:'/'});
}]);

app.controller('IndexController', ['$scope', function($scope){
    $scope.first = "Some";
    $scope.last = "One";
    $scope.heading = "Message: ";
    $scope.updateMessage = function() {
        $scope.message = 'Hello ' + $scope.first + ' ' + $scope.last + '!';
    };
}]);

var myMod = angular.module('myMod', []);
myMod.value('modMsg', 'Hello from My Module');
myMod.controller('controllerB', ['$scope', 'modMsg', function($scope, msg){
    $scope.message = msg;
}]);

app.value('appMsg', 'Hello from My App');
app.controller('controllerA', ['$scope', 'appMsg', function($scope, msg){
    $scope.message = msg;
}]);