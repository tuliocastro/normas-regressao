;
(function () {

    angular.module(CONSTANTS.APP).factory('EscoreFrontalSubcortical', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Escore Frontal Subcortical (0-104)');

        objeto.predito = function () {
            return 35.822 - ( 0.0024 * Math.pow(DadosPaciente.getIdade(),2)) + (9.213 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 11.21,
        };

        return objeto;

    }

})();