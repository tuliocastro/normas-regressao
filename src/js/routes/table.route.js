;
(function () {

    angular.module(CONSTANTS.APP).config(Routes);

    function Routes($stateProvider) {

        $stateProvider

            .state({
                name: 'table',
                url: '/table',
                templateUrl: "table.html",
                controller: "TableCtrl as ctrl"
            });

    }

})();