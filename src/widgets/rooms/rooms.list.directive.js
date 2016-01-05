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
    vm.totalItems = 1000;
    vm.currentPage = 1;
    var size = 5;
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
            size: size,
            from: vm.currentPage * size - size
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