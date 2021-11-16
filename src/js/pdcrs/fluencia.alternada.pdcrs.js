;
(function () {

    angular.module(CONSTANTS.APP).factory('FluenciaAlternadaPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Fluência Alternada (0-20)');

        objeto.predito = function () {
            return 6.444 - (0.0005 * Math.pow(DadosPaciente.getIdade(),2)) + (1.5205 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 3.575,
        };

        return objeto;

    }

})();