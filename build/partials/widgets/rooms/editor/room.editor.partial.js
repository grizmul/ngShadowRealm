(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('room.editor.partial.html',
    '<div class="h1">Room Editor <i class="fa fa-spinner" ng-class="{\'fa-spin\' : vm.saving}"></i><uib-alert ng-repeat=\'alert in vm.alerts\'   type=\'{{alert.type}}\' dismiss-on-timeout=\'1500\' close=\'vm.clearAlerts()\'>{{alert.msg}}</uib-alert></div>\n' +
    '\n' +
    '<div class="jumbotron">\n' +
    '    \n' +
    '<form>\n' +
    '  <div class="form-group">\n' +
    '    <label for="name">Name</label>\n' +
    '    <input type="text" class="form-control" ng-model="vm.room.name" id="name" placeholder="Name the room in CamelCase ie. darkAlleyNorth">\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <label for="description">Room description</label>\n' +
    '    <textarea rows="5" class="form-control"  required ng-model="vm.room.desc"  id="description" placeholder="Enter the room description"></textarea>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '      <label for="toNorth">North location</label>\n' +
    '      <div class="dropdown">\n' +
    '          <button class="btn btn-default dropdown-toggle" type ="button" id="toNorth" data-toggle="dropdown">\n' +
    '              ToNorth\n' +
    '              <span class="caret"></span>\n' +
    '              \n' +
    '      \n' +
    '      </div>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '  <pre>{{vm || json}}</pre>\n' +
    '  </div>  \n' +
    '\n' +
    '  <button type="submit" ng-click="vm.saveRoom()" class="btn btn-default">Save</button>\n' +
    '\n' +
    '<input type="text" \n' +
    '        ng-model="vm.asyncSelected" \n' +
    '        placeholder="Locations loaded via $http" \n' +
    '        uib-typeahead="address for address in vm.getLocation($viewValue)" \n' +
    '        typeahead-loading="loadingLocations" \n' +
    '        typeahead-no-results="noResults" \n' +
    '        typeahead-editable=false\n' +
    '        typeahead-on-select="vm.s($item, $model,$label)"\n' +
    '        typeahead-wait-ms="400"\n' +
    '        class="form-control">\n' +
    '    <i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>\n' +
    '    <div ng-show="noResults">\n' +
    '      <i class="glyphicon glyphicon-remove"></i> No Results Found\n' +
    '    </div>\n' +
    '    \n' +
    '<script type="text/ng-template" id="/tpl.html">\n' +
    '  Content of the template.\n' +
    '</script>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();
