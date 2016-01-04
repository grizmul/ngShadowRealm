(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('room.editor.partial.html',
    '<div class="h1">Room Editor</div>\n' +
    '<div class="jumbotron">\n' +
    '    \n' +
    '<form>\n' +
    '  <div class="form-group">\n' +
    '    <label for="name">Name</label>\n' +
    '    <input type="text" class="form-control" ng-model="vm.room.name" id="name" placeholder="Name the room in CamelCase ie. darkAlleyNorth">\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <label for="description">Room description</label>\n' +
    '    <textarea rows="5" class="form-control" ng-model="vm.room.desc"  id="description" placeholder="Enter the room description"></textarea>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '  <pre>{{vm || json}}</pre>\n' +
    '  </div>  \n' +
    '\n' +
    '  <div class="checkbox">\n' +
    '    <label>\n' +
    '      <input type="checkbox"> Check me out\n' +
    '    </label>\n' +
    '  </div>\n' +
    '  <button type="submit" ng-click="vm.saveRoom()" class="btn btn-default">Save</button>\n' +
    '\n' +
    '\n' +
    '</form>\n' +
    '</div>');
}]);
})();
