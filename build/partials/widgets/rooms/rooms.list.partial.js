(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('rooms.list.partial.html',
    '\n' +
    '<table class="table table-striped table-hover table-condensed">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th>Name / id</th>\n' +
    '            <th>Description</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '        <tr ng-repeat="obj in vm.rooms" >\n' +
    '            <td><i class="fa fa-trash"  ng-click="vm.removeRoom(obj)"></i></td>\n' +
    '            <td>{{obj._source.name}}</td> \n' +
    '            <td><div>{{obj._source.desc}}</div></td> \n' +
    '        </tr>\n' +
    '</table>\n' +
    '<div>\n' +
    '    <uib-pagination total-items="vm.totalItems" max-size="10" items-per-page="{{vm.size}}" ng-model="vm.currentPage" ng-change="vm.pageChanged()"></uib-pagination>\n' +
    '</div> \n' +
    '<ul class="list-group">\n' +
    '    <li  class="list-group-item ff" ng-repeat="msg in vm.msgs">{{msg}}</li>\n' +
    '</ul>\n' +
    '<pre>{{vm}}</pre> ');
}]);
})();
