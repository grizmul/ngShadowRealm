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
    '        <tr ng-repeat="obj in vm.rooms" class="fade-in">\n' +
    '            <td>{{obj._source.name}}</td> \n' +
    '            <td>{{obj._source.desc}}</td> \n' +
    '        </tr>\n' +
    '</table>\n' +
    '<div>\n' +
    '    <uib-pagination total-items="vm.totalItems" max-size="10" items-per-page="{{vm.size}}" ng-model="vm.currentPage" ng-change="vm.pageChanged()"></uib-pagination>\n' +
    '</div> \n' +
    '<pre>{{vm.rooms}}</pre> ');
}]);
})();
