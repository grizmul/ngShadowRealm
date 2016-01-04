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
function ListRoomsController(es){
    var vm = this;
    
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
                vm.rooms = resp.hits.hits;
            }
            else {
                console.log("not yuet");
                console.log(resp.hits);
            }
        }
    });
    
}