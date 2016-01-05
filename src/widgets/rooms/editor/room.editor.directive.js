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