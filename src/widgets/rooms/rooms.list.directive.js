angular
    .module('rooms')
    .directive('listRooms', ListRoomsDirective);

function ListRoomsDirective() {
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
    vm.totalItems = 1;
    vm.currentPage = 1;
    vm.size = 10;
    vm.pageChanged = pageChanged;


    es.count({
        index: 'rooms',
        q: 'name:*',
    }, function (err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log(resp);
            vm.totalItems = resp.count;
        }
    });


    pageChanged();

    function pageChanged() {
        es.search({
            index: 'rooms',
            q: 'name:*',
            size: vm.size,
            from: vm.currentPage * vm.size - vm.size
        }).then(function (resp) {
            if (resp.hits.total > 0) {
                console.log(resp.hits.hits);
                vm.rooms = resp.hits.hits;
            }
            else {
                console.log(resp.hits);
            }
        }, function (err) {
            console.log(err);
        });

    }

}