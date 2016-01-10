angular
    .module('npcs')
    .directive('npcsMselect', Constructor);


function Constructor(){
    var directive = {
        bindToController: true,
        controller: Controller,
        controllerAs: 'vm',
        restrict: 'A',
        templateUrl: 'npcsMselect.partial.html',
        link: link
        
    };
    
    return directive;
    function link( scope, element, attrs){
        //var select = element.find('select.npcsMselect');
        //var select = element.children()[1];
        
        //$( select).css(
          //  {
                //'width': width
            //});        
    }
   
}
Controller.$inject = ['es', '$timeout'];
function Controller(es, $timeout){
    var vm = this;
    vm.npcs = ['A very long monster name goes here', 'Wolf', 'Orc', 'Goblin', 'Gnome', 'Elf', 'Vagabond'];
    vm.rooms=[];
    vm.selected = [];
    
    
    
     es.search({
            index: 'rooms',
            q: 'name:*',
            size: 10,
            from: 0
        }).then(function (resp) {
                if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                for(var i=0; i<resp.hits.total; i ++)
                    vm.rooms.push(resp.hits.hits[i]['_source']);
            }
            else {
                console.log(resp.hits);
            }            
            
        }, function (err) {
            console.log(err);
        });
 
    
}
