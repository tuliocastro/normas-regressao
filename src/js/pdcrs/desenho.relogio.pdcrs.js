;
(function () {

    angular.module(CONSTANTS.APP).factory('DesenhoRelogioPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Desenho Relógio (0-10)');

        objeto.predito = function () {
            return 5.6848 - (0.0196 * (DadosPaciente.getIdade() - 58.9)) + (0.7315 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 1.789
        };

        return objeto;

    }

})();