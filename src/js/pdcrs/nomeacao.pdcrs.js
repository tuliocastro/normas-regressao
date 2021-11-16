;
(function () {

    angular.module(CONSTANTS.APP).factory('NomeacaoPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Nomeação (0-20)');

        objeto.predito = function () {
            return 12.044 + (-0.0002 * Math.pow(DadosPaciente.getIdade(),2)) + (1.338 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 2.963,
        };

        return objeto;

    }

})();