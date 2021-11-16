;
(function () {

    angular.module(CONSTANTS.APP).factory('MemoriaTrabalhoPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Memória Trabalho (0-10)');

        objeto.predito = function () {
            return 2.799 - (0.0282 * (DadosPaciente.getIdade() - 58.9)) + (0.9186 *  Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 1.912,
        };

        return objeto;

    }

})();