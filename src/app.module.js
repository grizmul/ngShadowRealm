    angular 
        .module('app',[ 
           'HtmlPartials',
           'elasticsearch',
           'ngRoute',
           'layout',
           'rooms',
           'ui.bootstrap'
        ])
        .service('es', function(esFactory){
            return esFactory({
                host: '10.0.1.100:9200',
                log: 'trace'
            });
        }); 