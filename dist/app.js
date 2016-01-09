(function() {
    'use strict';

    angular 
        .module('app',[ 
           'HtmlPartials',
           'elasticsearch',
           'ngRoute',
           'layout',
           'rooms',
           'ui.bootstrap',
           'ngAnimate'
        ])
        .service('es', function(esFactory){
            return esFactory({
                host: '10.0.1.100:9200',
                log: 'trace'
            });
        }); 

})();
(function() {
    'use strict';


    angular.module('layout', [
        'ngRoute',
        'Player',
        'room.editor'
    ]);

})();
(function() {
    'use strict';

    angular 
        .module('dice',[
            'HtmlPartials'
        ]); 

})();
(function() {
    'use strict';

angular.module('acMselect', [
    
])
.directive('acMonsters')

})();
(function() {
    'use strict';

   angular 
        .module('Player',[ 
           'HtmlPartials'
        ])
        ; 

})();
(function() {
    'use strict';


    angular.module('rooms', [
        
    ]);

})();
(function() {
    'use strict';

angular.module('room.editor', [
    
]);


})();
(function() {
    'use strict';


    angular
        .module('layout')
        .controller('LayoutController', LayoutController);

   // LayoutController.$inject = ['dependency1'];
    function LayoutController() {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }


})();
(function() {
    'use strict';


angular.module('layout')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
    
        .when('/playereditor',{
            template : '<div player-creator-directive></div player-creator-directive>'
        })
        .when('/roomeditor', {
            template : '<div room-editor/>'
        })
        .when('/rooms', {
            template : '<div list-rooms/>'
        })
        .when('/',{
            template : 'Welcome'
        })
        ;

} 

})();
(function() {
    'use strict';




})();
(function() {
    'use strict';

angular
    .module('Player')
    .directive('playerCreatorDirective', Directive);

//Directive.$inject = ['dependency1'];
function Directive() {//dependency1) {
    var directive = {
        bindToController: true,
        controller: ControllerController,
        controllerAs: 'vm',
        templateUrl: 'player.creator.partial.html',
        replace: true,
        link: link,
        restrict: 'A',
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {

    }
}
/* @ngInject */
ControllerController.$inject = ['es'];
function ControllerController(es) {
    var vm = this;
    vm.roll = roll;
    vm.dieroll = dieroll;
    vm.calcMaxHitPoints = calcMaxHitPoints;
    vm.calcBaseDmg = calcBaseDmg;
    vm.calcBaseMagicDmg = calcBaseMagicDmg;
    vm.calcBaseToHit = calcBaseToHit;
    
    vm.obj = {};
    
    vm.player = {
        str: "14",
        dex: "12",
        vit: "12",
        int: "12"
    };
    vm.roll();

    function calcMaxHitPoints() {
        return Math.floor(vm.player.vit * 1.4);
    }

    function calcBaseMagicDmg() {
        var val = Math.ceil((vm.player.int - 9) * 0.25);
        return val >= 0 ? val : 0;
    }
    function calcBaseDmg() {
        var val = Math.ceil((vm.player.str - 9) * 0.25);
        return val >= 0 ? val : 0;
    }
    function calcBaseToHit() {
        var val = (vm.player.dex / 18) * 100;
        return val.toFixed(0);
    }

    function roll() {
        vm.player.str = vm.dieroll(3, 6);
        vm.player.dex = vm.dieroll(3, 6);
        vm.player.int = vm.dieroll(3, 6);
        vm.player.vit = vm.dieroll(3, 6);
        vm.calcMaxHitPoints();
    }

    function dieroll(num, type) {
        var total = 0;
        for (var i = 1; i <= num; i++) {
            total += Math.floor(Math.random() * (type - 1 + 1)) + 1;
        }
        return total;
    }
}


})();
(function() {
    'use strict';


    angular
        .module('Player')
        .factory('PlayerCreatoryFactory', PlayerCreatoryFactory);

    //Service.$inject = ['dependency1']; 
    function PlayerCreatoryFactory() {
        return {
            blat: function(){
                
            }
        };
        

    }


})();
(function() {
    'use strict';

angular
    .module('rooms')
    .directive('listRooms', ListRoomsDirective);

function ListRoomsDirective() {
    return {
        bindToController: true,
        controller: ListRoomsController,
        controllerAs: 'vm',
        templateUrl: 'rooms.list.partial.html',
        restrict: 'A'

    };
}

ListRoomsController.$inject = ['es', '$animate'];
function ListRoomsController(es, $animate) {
    var vm = this;
    vm.totalItems = 1;
    vm.currentPage = 1;
    vm.size = 10;
    vm.pageChanged = pageChanged;
    vm.removeRoom=removeRoom;
    vm.gone = false;
    vm.msgs=["hi","bye","sky"];
    
    es.count({
        index: 'rooms',
        q: 'name:*',
    }, function (err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log(resp);
            vm.totalItems = resp.count;
        }
    });

    function removeRoom(obj){
       vm.msgs.splice(1,1);
    }
    pageChanged();

    function pageChanged() {
        es.search({
            index: 'rooms',
            q: 'name:*',
            size: vm.size,
            from: vm.currentPage * vm.size - vm.size
        }).then(function (resp) {
            if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                vm.rooms = resp.hits.hits;
            }
            else {
                console.log(resp.hits);
            }
        }, function (err) {
            console.log(err);
        });

    }

}

})();
(function() {
    'use strict';

angular
    .module('room.editor')
    .directive('roomEditor', RoomEditorDirective);


function RoomEditorDirective() {
    return {
        bindToController: true,
        controller: RoomEditorController,
        controllerAs: 'vm',
        templateUrl: 'room.editor.partial.html',
        restrict: 'A'

    };
}
RoomEditorController.$inject = ['es', '$timeout'];
function RoomEditorController(es, $timeout) {
    var vm = this;
    vm.saveRoom = saveRoom;
    vm.clearAlerts=clearAlerts;
    vm.saving = false;
  
    
    vm.alerts = [   
    ];
    vm.room = {
        name: '',
        desc: ''
    };
    vm.getLocation=getLocation;
    vm.s=s;
    

    function s($item, $model, $label){
        console.log($item);
        console.log($model);
        console.log($label);
        vm.asyncSelected = '';
    }
    
    function getLocation(x){
        console.log(x);
        return ['aa', 'bb', 'cc'];
        
    }

    function clearAlerts(){
        vm.alerts.length = 0;    
    }
    
    
    function saveRoom() {
        vm.saving = true;
        $timeout(function(){
            vm.saving = false;
        }, 2500);
        console.log("saving " + JSON.stringify(vm.room) + " as " + angular.toJson(vm.room, false));
        console.log(vm.room.name);
        es.create({
            index: 'rooms',
            type: 'room',
            id: vm.room.name,
            body: vm.room
        }).then(function (resp) {
            vm.alerts.push({
               type: 'success',
               msg : 'Saved room ' + vm.room.name
            });
            vm.room.name='';
            vm.room.desc=''; 
        }, function (err) {
            console.log(err);
        });

    }

}

})();
(function() {
    'use strict';

(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dice.partial.html',
    '<div>hi</div>');
}]);
})();


})();
(function() {
    'use strict';

(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('player.creator.partial.html',
    '<div class="jumbotron">\n' +
    '    <div class="container-fluid">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-6">\n' +
    '                <form class="form-horizontal">\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="inputStr" class="col-xs-2 control-label">Strength</label>\n' +
    '                        <div class="col-xs-2">\n' +
    '                            <input type="text" ng-model="vm.player.str" class="form-control" id="inputStr" readonly>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="inputPassword3" class="col-xs-2 control-label">Dexterity</label>\n' +
    '                        <div class="col-xs-2">\n' +
    '                            <input type="text" ng-model="vm.player.dex" class="form-control" id="inputPassword3" readonly>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="inputVit" class="col-xs-2 control-label">Vitality</label>\n' +
    '                        <div class="col-xs-2">\n' +
    '                            <input type="text" ng-model="vm.player.vit" class="form-control" id="inputVitality" readonly>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="inputInt" class="col-xs-2 control-label">Intelligence</label>\n' +
    '                        <div class="col-xs-2">\n' +
    '                            <input type="text" ng-model="vm.player.int" class="form-control" id="inputInt" readonly>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '\n' +
    '                        <div class="col-xs-2 col-xs-offset-2">\n' +
    '                            <input type="button" class="btn btn-default" ng-click="vm.roll()" value="Roll">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="col-md-4">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-xs-7">Base Hit Points</div>\n' +
    '                    <div class="col-xs-2">{{vm.calcMaxHitPoints()}}</div>\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="col-xs-7">Phys Dmg Mod</div>\n' +
    '                    <div class="col-xs-2">+{{vm.calcBaseDmg()}}</div>\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="col-xs-7">Magic Dmg Mod</div>\n' +
    '                    <div class="col-xs-2">+{{vm.calcBaseMagicDmg()}}</div>\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="col-xs-7">Base ToHit</div>\n' +
    '                    <div class="col-xs-2">{{vm.calcBaseToHit()}}</div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <pre>{{vm.player | json}}</pre>\n' +
    '</div>');
}]);
})();


})();
(function() {
    'use strict';

(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('rooms.list.partial.html',
    '\n' +
    '<table class="table table-striped table-hover table-condensed">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th>Name / id</th>\n' +
    '            <th>Description</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '        <tr ng-repeat="obj in vm.rooms" >\n' +
    '            <td><i class="fa fa-trash"  ng-click="vm.removeRoom(obj)"></i></td>\n' +
    '            <td>{{obj._source.name}}</td> \n' +
    '            <td><div>{{obj._source.desc}}</div></td> \n' +
    '        </tr>\n' +
    '</table>\n' +
    '<div>\n' +
    '    <uib-pagination total-items="vm.totalItems" max-size="10" items-per-page="{{vm.size}}" ng-model="vm.currentPage" ng-change="vm.pageChanged()"></uib-pagination>\n' +
    '</div> \n' +
    '<ul class="list-group">\n' +
    '    <li  class="list-group-item ff" ng-repeat="msg in vm.msgs">{{msg}}</li>\n' +
    '</ul>\n' +
    '<pre>{{vm}}</pre> ');
}]);
})();


})();
(function() {
    'use strict';

(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('room.editor.partial.html',
    '<div class="h1">Room Editor <i class="fa fa-spinner" ng-class="{\'fa-spin\' : vm.saving}"></i><uib-alert ng-repeat=\'alert in vm.alerts\'   type=\'{{alert.type}}\' dismiss-on-timeout=\'1500\' close=\'vm.clearAlerts()\'>{{alert.msg}}</uib-alert></div>\n' +
    '\n' +
    '<div class="jumbotron">\n' +
    '    \n' +
    '<form>\n' +
    '  <div class="form-group">\n' +
    '    <label for="name">Name</label>\n' +
    '    <input type="text" class="form-control" ng-model="vm.room.name" id="name" placeholder="Name the room in CamelCase ie. darkAlleyNorth">\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <label for="description">Room description</label>\n' +
    '    <textarea rows="5" class="form-control"  required ng-model="vm.room.desc"  id="description" placeholder="Enter the room description"></textarea>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '      <label for="toNorth">North location</label>\n' +
    '      <div class="dropdown">\n' +
    '          <button class="btn btn-default dropdown-toggle" type ="button" id="toNorth" data-toggle="dropdown">\n' +
    '              ToNorth\n' +
    '              <span class="caret"></span>\n' +
    '              \n' +
    '      \n' +
    '      </div>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '  <pre>{{vm || json}}</pre>\n' +
    '  </div>  \n' +
    '\n' +
    '  <button type="submit" ng-click="vm.saveRoom()" class="btn btn-default">Save</button>\n' +
    '\n' +
    '<input type="text" \n' +
    '        ng-model="vm.asyncSelected" \n' +
    '        placeholder="Locations loaded via $http" \n' +
    '        uib-typeahead="address for address in vm.getLocation($viewValue)" \n' +
    '        typeahead-loading="loadingLocations" \n' +
    '        typeahead-no-results="noResults" \n' +
    '        typeahead-editable=false\n' +
    '        typeahead-on-select="vm.s($item, $model,$label)"\n' +
    '        typeahead-wait-ms="400"\n' +
    '        class="form-control">\n' +
    '    <i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>\n' +
    '    <div ng-show="noResults">\n' +
    '      <i class="glyphicon glyphicon-remove"></i> No Results Found\n' +
    '    </div>\n' +
    '    \n' +
    '<script type="text/ng-template" id="/tpl.html">\n' +
    '  Content of the template.\n' +
    '</script>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();


})();