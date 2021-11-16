;
(function () {

    angular.module(CONSTANTS.APP).factory('CopiaRelogio', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Copia Relogio (0-10)');

        objeto.predito = function () {
            return 8.11 - ( 0.0138 * (DadosPaciente.getIdade() - 58.9)) + (0.3906 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 0.798
        };

        return objeto;

    }

})();