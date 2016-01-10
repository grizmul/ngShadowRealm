angular
    .module('npcs')
    .directive('npcsMselect', Constructor);


function Constructor() {
    var directive = {
        bindToController: true,
        controller: Controller,
        controllerAs: 'vm',
        restrict: 'A',
        templateUrl: 'npcsMselect.partial.html',
        link: link

    };

    return directive;
    function link(scope, element, attrs) {
        //       scope.vm.e = element;
        //var select = element.find('select.npcsMselect');
        //var select = element.children()[1];
        
        //$( select).css(
        //  {
        //'width': width
        //});       
        var list = attrs['ng-options'];
        scope.$watch(list, function () {
            element.trigger('chosen:updated');console.log("watch called"); 
        }, true);

        scope.$watch(attrs['ngModel'], function() {
            element.trigger('chosen:updated');console.log("watch called"); 
        }, true);
 
    }

}
Controller.$inject = ['es', '$timeout', '$element', '$scope'];
function Controller(es, $timeout, $element, $scope) {
    var vm = this;
    vm.npcs = ['A very long monster name goes here', 'Wolf', 'Orc', 'Goblin', 'Gnome', 'Elf', 'Vagabond'];
    vm.rooms = [];
    vm.selected = [];
  
   
    es.search({
        index: 'rooms',
        q: 'name:*',
        size: 10,
        from: 0
    }).then(function (resp) {

        if (resp.hits.total > 0) {
            console.log(resp.hits.hits);
            for (var i = 0; i < resp.hits.total; i++)
                vm.rooms.push(resp.hits.hits[i]['_source']); 
       
         //$element.find('.chosen').chosen();
            //$element.find('chosen').trigger('change');   
            
        }
        else {
            console.log(resp.hits);
        }

    }, function (err) {
        console.log(err);
    });


}
