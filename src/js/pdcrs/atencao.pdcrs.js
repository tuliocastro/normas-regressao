;
(function () {

    angular.module(CONSTANTS.APP).factory('AtencaoPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Atenção (0-10)');

        objeto.predito = function () {
            return 5.4178 - (0.0002 * Math.pow(DadosPaciente.getIdade(),2)) + (0.945 * Math.sqrt(DadosPaciente.getEscolaridade(),2));
        };

        objeto.variaveis = {
            z: 2.023,
        };

        return objeto;

    }

})();