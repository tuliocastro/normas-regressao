;
(function () {

    angular.module(CONSTANTS.APP).factory('TotalPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Total (0-134)');

        objeto.predito = function () {
            return 55.766 - (0.0028 * DadosPaciente.getIdade() * DadosPaciente.getIdade()) + (11.152 * Math.sqrt(DadosPaciente.getEscolaridade(), 2));
        };

        objeto.variaveis = {
            z: 13.15,
            zInf: 12.75,
            zSup: 14.74,
            cutOff: -18.26210,
            cutOffInf: -16.99575,
            cutOffSup: -19.64842
        };

        return objeto;

    }

})();