;
(function () {

    const INITIAL_ROUTE = "table";

    window.CONSTANTS = {
        APP: 'app',
        EMPTY_TEMPLATE: '<ui-view />'
    };

    angular.module(CONSTANTS.APP, [
        'ui.router',
    ]);

    angular.module(CONSTANTS.APP).config(function ($urlRouterProvider, $httpProvider) {

        //Default Route
        $urlRouterProvider.otherwise(INITIAL_ROUTE);

    });

    angular.module(CONSTANTS.APP).run(function ($rootScope, $state, GlobalConstants) {

        $rootScope.constants = GlobalConstants;

    });

})();