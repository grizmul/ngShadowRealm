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
        var x= 0;
        //$('.npcsMselectSelect').chosen({width: '250px'});
        //       scope.vm.e = element;
        //var select = element.find('select.npcsMselect');
        //var select = element.children()[1];
        
        //$( select).css(
        //  {
        //'width': width
        //});       
        // var list = attrs['ng-options'];
        // scope.$watch(list, function () {
        //     element.trigger('chosen:updated');console.log("watch called"); 
        // }, true);

        // scope.$watch(attrs.ngModel, function() {
        //     element.trigger('chosen:updated');console.log("watch called"); 
        // }, true);
 
    }

}
Controller.$inject = ['es', '$timeout', '$element'];
function Controller(es, $timeout, $element) {
    var vm = this;
    vm.selected;
    vm.npcs = ['A very long monster name goes here', 'Wolf', 'Orc', 'Goblin', 'Gnome', 'Elf', 'Vagabond'];
    //vm.rooms = undefined;
    
  vm.doStuff = function(){
    //$('select').trigger('chosen:updated'); works
    //$element.children().trigger('chosen:updated');
    //$('.npcsMselect').children().trigger('chosen:updated');
    //$('.npcsMselect > select').children().trigger('chosen:updated');
    $('.npcsMselectSelect').trigger('chosen:updated');
    console.log('trigger');
      
  }
  
   $timeout(function(){
       
   
    es.search({
        index: 'rooms',
        q: 'name:*',
        size: 5,
        from: 0
    }).then(function (resp) {

        if (resp.hits.total > 0) {
            vm.rooms = [];
            console.log(resp.hits.hits);
            for (var i = 0; i < resp.hits.total; i++){
                var obj = resp.hits.hits[i]._source;
                obj.i = 'group ' + Math.round(i/2); 
                vm.rooms.push(obj);
            } 
          vm.selected = vm.rooms[0];
         //$element.children().trigger('chosen:updated');   
        }
        else {
            console.log(resp.hits);
        }

    }, function (err) { 
        console.log(err);  
    });  
},1000);

}
