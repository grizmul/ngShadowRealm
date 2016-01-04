angular
    .module('rooms')
    .directive('listRooms', ListRoomsDirective);
    
function ListRoomsDirective(){
     return {
        bindToController: true,
        controller: ListRoomsController,
        controllerAs: 'vm',
        templateUrl: 'rooms.list.partial.html',
        restrict: 'A'

    };
}

ListRoomsController.$inject = ['es'];
function ListRoomsController(es) {
    var vm = this;

    es.search({
        index: 'rooms',
        type: 'room',
        //q: 'name:*'
        body: {
            query: {
                match_all: {}
            }
        }
    }).then(function (body) {
        //var hits = body.hits.hits;
        //console.log(hits);
        vm.rooms = body.hits.hits;
    }, function (error) {
        console.trace(error.message);
    });

}