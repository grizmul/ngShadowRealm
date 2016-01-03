(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('player.creator.partial.html',
    '<div class=""\n' +
    '<form class="form-horizontal">\n' +
    '  <div class="form-group">\n' +
    '    <label for="inputStr" class="col-sm-2 control-label">Str</label>\n' +
    '    <div class="col-sm-10">\n' +
    '      <input type="text" class="form-control" id="inputStr" placeholder="Email">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>\n' +
    '    <div class="col-sm-10">\n' +
    '      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <div class="col-sm-offset-2 col-sm-10">\n' +
    '      <div class="checkbox">\n' +
    '        <label>\n' +
    '          <input type="checkbox"> Remember me\n' +
    '        </label>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="form-group">\n' +
    '    <div class="col-sm-offset-2 col-sm-10">\n' +
    '      <button type="submit" class="btn btn-default">Sign in</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</form>');
}]);
})();
