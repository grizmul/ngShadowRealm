angular
    .module('Player')
    .directive('playerCreatorDirective', Directive);

//Directive.$inject = ['dependency1'];
function Directive(){//dependency1) {
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

}
