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
