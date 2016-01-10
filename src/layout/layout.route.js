
angular.module('layout')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
    
        .when('/playereditor',{
            template : '<div player-creator-directive></div player-creator-directive>'
        })
        .when('/roomeditor', {
            template : '<div room-editor/>'
        })
        .when('/rooms', {
            template : '<div list-rooms/>'
        })
        .when('/npcs',{
            template : '<div class="npcsMselect" npcs-mselect/>'
        })
        .when('/',{
            template : 'Welcome'
        })
        ;

} 