angular
    .module('npcs')
    .directive('npcsMselect', Constructor);


function Constructor(){
    var width = "250px !important";
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
        var select = element.find('chosen-container'); 
        $( select).css(
            {
                'width': width
            });        
    }
   
}

function Controller(){
    var vm = this;
    vm.npcs = ['A very long monster name goes here', 'Wolf', 'Orc', 'Goblin', 'Gnome', 'Elf', 'Vagabond'];
    vm.selected = []; 
    
}
