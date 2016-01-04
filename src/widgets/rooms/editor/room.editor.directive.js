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
    es.ping({
        requestTimeout: 1000,
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
    es.search({
        index: 'rooms',
        q: 'name:*'
    }, function (err, resp) {
        if (err) {
            console.log('Error searching');
            console.log(err);
        } else {
            if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                vm.obj = angular.fromJson(resp.hits.hits);
                console.log(JSON.stringify(resp.hits.hits[0]._source));
            }
            else {
                console.log("not yuet");
                console.log(resp.hits);
            }
        }
    });
    
    function saveRoom() {
        console.log("saving " + JSON.stringify(vm.room) + " as " + angular.toJson(vm.room, false));
        console.log(vm.room.name);
        es.create({
            index: 'rooms',
            type: 'room',
            id: vm.room.name,
            body: vm.room
        }, function (err, resp) {
        if (err) {
            console.log('Error creating');
            console.log(err);
        } else {
            console.log("success");
        }
    });
    }

}