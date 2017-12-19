var app = angular.module('myapp', ['myMod', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'IndexController',
        templateUrl:'/views/index.html'
    }).when('/example1', {
        controller: 'controllerA',
        templateUrl:'/views/example1.html'
    }).when('/herits', {
        controller: 'LevelA',
        templateUrl: '/views/herits.html'
    })
    .when('/changeName', {
    controller: 'Characters',
    templateUrl: '/views/changename.html'
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

app.controller('LevelA', ['$scope', function($scope){
    $scope.title = 'LevelA';
    $scope.ValueA = 1;
    $scope.inc = function(){
        $scope.ValueA++;
    };
}]);

app.controller('LevelB', ['$scope', function($scope){
    $scope.title = 'LevelB';
    $scope.ValueB = 1;
    $scope.inc = function(){
        $scope.ValueB++;
    };
}]);

app.controller('LevelC', ['$scope', function($scope){
    $scope.title = 'LevelC';
    $scope.ValueC = 1;
    $scope.inc = function(){
        $scope.ValueC++;
    };
}]);

app.controller('Characters', function($scope){
    $scope.names = ['anger', 'anger6', 'happyAnger6', 'an'];
    $scope.currentName = $scope.names[0];
    $scope.changeName = function(){
        $scope.currentName = this.name;
        $scope.$broadcast('CharacterChanged', this.name);
    };
    $scope.$on('CharacterDeleted', function(event, removeName){
        var i = $scope.names.indexOf(removeName);
        $scope.names.splice(i, 1);
        $scope.currentName = $scope.names[0];
        $scope.$broadcast('CharacterChanged', $scope.currentName);
    });
});

app.controller('Character', function($scope){
    $scope.info = {'anger':{weapon:'Sting', race:'Hobbit'},
                    'anger6':{weapon:'Sword', race:'Man'},
                    'happyAnger6':{weapon:'Bow', race:'Elf'},
                    'an':{weapon:'Axe', race:'Dwarf'}};
    $scope.currentInfo = $scope.info['anger'];
    $scope.$on('CharacterChanged', function(event, newCharacter){
      $scope.currentInfo = $scope.info[newCharacter];
    });
    $scope.deleteChar = function(){
        delete $scope.info[$scope.currentName];
        $scope.$emit('CharacterDeleted', $scope.currentName);
    };
});
