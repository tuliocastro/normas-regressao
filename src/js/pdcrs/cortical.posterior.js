;
(function () {

    angular.module(CONSTANTS.APP).factory('CorticalPosterior', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Cortical Posterior (0-30)');

        objeto.predito = function () {
            return 20.496 - ( 0.0003 * Math.pow(DadosPaciente.getIdade(),2)) + (1.773 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 3.259,
        };

        return objeto;

    }

})();