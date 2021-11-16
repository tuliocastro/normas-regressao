const classificacoesEnum = {
    'INFERIOR': "Inferior",
    'MEDIO_INFERIOR': "Médio Inferior",
    'MEDIO': "Médio",
    'SUPERIOR': "Superior",
    'MUITO_SUPERIOR': "Muito Superior",
    'INDEFINIDO': "Indefinido"
};

(function () {

    angular.module(CONSTANTS.APP).filter('classificacao', Filter);

    function Filter() {

        return function (input) {

            return classificacoesEnum[input];
        }

    }

})();