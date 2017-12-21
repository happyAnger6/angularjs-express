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
    .when('/expressionScope', {
        controller: 'expressionScope',
        templateUrl: '/views/expressionscope.html'
    })
    .when('/filters', {
        controller: 'filterController',
        templateUrl: '/views/filters.html'
    })
    .when('/filterSort', {
        controller: 'filterSortController',
        templateUrl: '/views/filter_sort.html'
    })
    .when('/censorFilter', {
        controller: 'censorController',
        templateUrl: '/views/censorFilter.html'
    })
    .when('/formDirective', {
        controller: 'formDirectiveController',
        templateUrl: '/views/formDirective.html'
    })
    .when('/directiveBind', {
        controller: 'directiveBindController',
        templateUrl: '/views/directiveBind.html'
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

app.controller('expressionScope', function($scope){
    $scope.first = 'Throin';
    $scope.last = "Oakenshield";
    $scope.newFirst = "Gandalf";
    $scope.newLast = "Grehame";
    $scope.combine = function(fName, lName){
        return fName + ' ' + lName;
    };
    $scope.setName = function(fName, lName) {
        $scope.first = fName;
        $scope.last = lName;
    };
});

app.controller('filterController', function($scope){
    $scope.JSONobj = {title:"myTitle"};
    $scope.word = "Supercalifragilisticexpialidocious";
    $scope.days = ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday'];
});

app.controller('filterSortController', ['$scope', 'filterFilter', function($scope, filterFilter){
    $scope.cameras = [
        {make:'Canon', model:'70D', mp:20.2},
        {make:'Canon', model:'6D', mp:20},
        {make:'Nikon', model:'D7100', mp:24.1},
        {make:'Nikon', model:'D5200', mp:24.1},
    ];
    $scope.filteredCameras = $scope.cameras;
    $scope.reverse = true;
    $scope.column = 'make';
    $scope.setSort = function(column){
        $scope.column = column;
        $scope.reverse = !$scope.reverse;
    };
    $scope.filterString='';
    $scope.setFilter = function(value){
        $scope.filteredCameras = filterFilter($scope.cameras, $scope.filterString);
    };
}]);

app.filter('censor', function(){
   return function(input, replacement){
        var cWords = ['bad', 'evial', 'dark'];
        var out = input;
        for(var i = 0;i<cWords.length;i++){
            out = out.replace(cWords[i], replacement);
        }
        return out;
   };
});

app.controller("censorController", ['$scope', 'censorFilter', function($scope, censorFilter){
   $scope.phrase = "This is a bad phase.";
   $scope.txt = "Click to filter out dark and evil.";
   $scope.filterText = function(){
       $scope.txt = censorFilter($scope.txt, '<<censored>>');
   }
}]);

app.controller('formDirectiveController', function($scope, filterFilter){
    $scope.cameras = [
        {make:'Canon', model:'70D', mp:20.2},
        {make:'Canon', model:'6D', mp:20},
        {make:'Nikon', model:'D7100', mp:24.1},
        {make:'Nikon', model:'D5200', mp:24.1},
    ];
    $scope.cameraObj = $scope.cameras[0];
    $scope.cameraName = 'Canon';
    $scope.cbValue = '';
    $scope.someText = '';
});

app.controller('directiveBindController', function($scope){
  $scope.colors = ['red', 'green', 'blue'];
  $scope.myStyle = {"background-color":'blue'};
  $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday'];
  $scope.msg = "msg from the model";
});