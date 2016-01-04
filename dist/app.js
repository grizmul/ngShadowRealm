(function() {
    'use strict';

    angular 
        .module('app',[ 
           'HtmlPartials',
           'elasticsearch',
           'ngRoute',
           'layout',
           'rooms'
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
    // Usage:
    //
    // Creates:
    // 
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
    
    es.ping({
        requestTimeout: 1000,
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
    es.search({
       index: 'tests',
       q: 'name:test3'
    },function(err, resp){
        if(err){
            console.log('Error searching');
            console.log(err);
        }else{
            if(resp.hits.total>0){
                vm.obj = resp.hits.hits[0]._source;
                console.log(JSON.stringify(resp.hits.hits[0]._source));
            }
            else {
                console.log("not yuet");
                console.log(resp.hits);
            }
        }
    }
    );
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
    
function ListRoomsDirective(){
     return {
        bindToController: true,
        controller: ListRoomsController,
        controllerAs: 'vm',
        templateUrl: 'rooms.list.partial.html',
        restrict: 'A'

    };
}

ListRoomsController.$inject = ['es'];
function ListRoomsController(es){
    var vm = this;
    
    es.search({
        index: 'rooms',
        q: 'name:*'
    }, function (err, resp) {
        if (err) {
            console.log('Error searching');
            console.log(err);
        } else {
            if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                vm.rooms = resp.hits.hits;
            }
            else {
                console.log("not yuet");
                console.log(resp.hits);
            }
        }
    });
    
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
RoomEditorController.$inject = ['es'];
function RoomEditorController(es) {
    var vm = this;
    vm.saveRoom = saveRoom;

    vm.room = {
        name: '',
        desc: ''
    };
    es.ping({
        requestTimeout: 1000,
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
    es.search({
        index: 'rooms',
        q: 'name:*'
    }, function (err, resp) {
        if (err) {
            console.log('Error searching');
            console.log(err);
        } else {
            if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                vm.obj = angular.fromJson(resp.hits.hits);
                console.log(JSON.stringify(resp.hits.hits[0]._source));
            }
            else {
                console.log("not yuet");
                console.log(resp.hits);
            }
        }
    });
    
    function saveRoom() {
        console.log("saving " + JSON.stringify(vm.room) + " as " + angular.toJson(vm.room, false));
        console.log(vm.room.name);
        es.create({
            index: 'rooms',
            type: 'room',
            id: vm.room.name,
            body: vm.room
        }, function (err, resp) {
        if (err) {
            console.log('Error creating');
            console.log(err);
        } else {
            console.log("success");
        }
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
    '    <pre>{{vm.obj | json}}</pre>\n' +
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
    '<table class="table table-striped table-hover table-condensed">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th>Name / id</th>\n' +
    '            <th>Description</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '        <tr ng-repeat="obj in vm.rooms">\n' +
    '            <td>{{obj._source.name}}</td>\n' +
    '            <td>{{obj._source.desc}}</td>\n' +
    '        </tr>\n' +
    '</table>\n' +
    '<pre>{{vm.rooms}}</pre>');
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
    '<div class="h1">Room Editor</div>\n' +
    '<div class="jumbotron">\n' +
    '    \n' +
    '<form>\n' +
    '  <div class="form-group">\n' +
    '    <label for="name">Name</label>\n' +
    '    <input type="text" class="form-control" ng-model="vm.room.name" id="name" placeholder="Name the room in CamelCase ie. darkAlleyNorth">\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <label for="description">Room description</label>\n' +
    '    <textarea rows="5" class="form-control" ng-model="vm.room.desc"  id="description" placeholder="Enter the room description"></textarea>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '  <pre>{{vm || json}}</pre>\n' +
    '  </div>  \n' +
    '\n' +
    '  <div class="checkbox">\n' +
    '    <label>\n' +
    '      <input type="checkbox"> Check me out\n' +
    '    </label>\n' +
    '  </div>\n' +
    '  <button type="submit" ng-click="vm.saveRoom()" class="btn btn-default">Save</button>\n' +
    '\n' +
    '\n' +
    '</form>\n' +
    '</div>');
}]);
})();


})();