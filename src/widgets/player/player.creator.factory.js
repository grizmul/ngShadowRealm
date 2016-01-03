
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
