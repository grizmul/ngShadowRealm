(function() {
    'use strict';

    angular 
        .module('app',[ 
           'HtmlPartials',
           'Player'
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
        ]); 

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
        link: link,
        restrict: 'EA',
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {

    }
}
/* @ngInject */
function ControllerController() {
    var vm = this;
    vm.roll = roll;
    vm.dieroll = dieroll;
    vm.calcMaxHitPoints = calcMaxHitPoints;
    vm.calcBaseDmg = calcBaseDmg;
    vm.calcBaseMagicDmg = calcBaseMagicDmg;
    vm.calcBaseToHit=calcBaseToHit;
    
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
    function calcBaseToHit(){
        var val = (vm.player.dex / 18 ) * 100;
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
    '<div class="container-fluid">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-6">\n' +
    '            <form class="form-horizontal">\n' +
    '                <div class="form-group">\n' +
    '                    <label for="inputStr" class="col-xs-2 control-label">Strength</label>\n' +
    '                    <div class="col-xs-2">\n' +
    '                        <input type="text" ng-model="vm.player.str" class="form-control" id="inputStr" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="inputPassword3" class="col-xs-2 control-label">Dexterity</label>\n' +
    '                    <div class="col-xs-2">\n' +
    '                        <input type="text" ng-model="vm.player.dex" class="form-control" id="inputPassword3" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="inputVit" class="col-xs-2 control-label">Vitality</label>\n' +
    '                    <div class="col-xs-2">\n' +
    '                        <input type="text" ng-model="vm.player.vit" class="form-control" id="inputVitality" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <label for="inputInt" class="col-xs-2 control-label">Intelligence</label>\n' +
    '                    <div class="col-xs-2">\n' +
    '                        <input type="text" ng-model="vm.player.int" class="form-control" id="inputInt" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    \n' +
    '                    <div class="col-xs-2 col-xs-offset-2">\n' +
    '                        <input type="button" class="btn btn-default" ng-click="vm.roll()" value="Roll">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                \n' +
    '        </div>\n' +
    '<div class="col-md-3">\n' +
    '    <div class="row">\n' +
    '        <div class="col-xs-6">Base Hit Points</div>\n' +
    '        <div class="col-xs-2">{{vm.calcMaxHitPoints()}}</div>    \n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-xs-6">Phys Dmg Mod</div>\n' +
    '        <div class="col-xs-2">+{{vm.calcBaseDmg()}}</div>    \n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-xs-6">Magic Dmg Mod</div>\n' +
    '        <div class="col-xs-2">+{{vm.calcBaseMagicDmg()}}</div>    \n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-xs-6">Base ToHit</div>    \n' +
    '        <div class="col-xs-2">{{vm.calcBaseToHit()}}</div>    \n' +
    '    </div>\n' +
    '    \n' +
    '</div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '</form>');
}]);
})();


})();