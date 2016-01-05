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


    function saveRoom() {
        console.log("saving " + JSON.stringify(vm.room) + " as " + angular.toJson(vm.room, false));
        console.log(vm.room.name);
        es.create({
            index: 'rooms',
            type: 'room',
            id: vm.room.name,
            body: vm.room
        }).then(function (resp) {
            console.log("success");
        }, function (err) {
            console.log(err);
        });

    }

}