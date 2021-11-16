;
(function () {

    angular.module(CONSTANTS.APP).factory('FluenciaAcoesPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Fluência de Ações (0-30)');

        objeto.predito = function () {
            return 8.962 - (0.0004 * Math.pow(DadosPaciente.getIdade(), 2)) + (0.4709 * DadosPaciente.getEscolaridade());
        };

        objeto.variaveis = {
            z: 4.374,
        };

        return objeto;

    }

})();