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
