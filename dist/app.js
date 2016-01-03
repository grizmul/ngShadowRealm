(function() {
    'use strict';

    angular 
        .module('app',[ 
           'HtmlPartials',
           'Player'
        ]); 

})();
(function() {
    'use strict';

    angular 
        .module('dice',[
            'HtmlPartials'
        ]); 

})();
(function() {
    'use strict';

   angular 
        .module('Player',[ 
           'HtmlPartials'
        ]); 

})();
(function() {
    'use strict';

angular
    .module('Player')
    .directive('playerCreatorDirective', Directive);

//Directive.$inject = ['dependency1'];
function Directive(){//dependency1) {
    // Usage:
    //
    // Creates:
    // 
    var directive = {
        bindToController: true,
        controller: ControllerController,
        controllerAs: 'vm',
        templateUrl: 'player.creator.partial.html',
        link: link,
        restrict: 'EA', 
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {
    }
}
/* @ngInject */
function ControllerController() {

}


})();
(function() {
    'use strict';


    angular
        .module('Player')
        .factory('PlayerCreatoryFactory', PlayerCreatoryFactory);

    //Service.$inject = ['dependency1'];
    function PlayerCreatoryFactory() {
        return {
            blat: function(){
                
            }
        };
        

    }


})();
(function() {
    'use strict';

(function(module) {
try {
  module = angular.module('HtmlPartials');
} catch (e) {
  module = angular.module('HtmlPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dice.partial.html',
    '<div>hi</div>');
}]);
})();


})();
(function() {
    'use strict';

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


})();