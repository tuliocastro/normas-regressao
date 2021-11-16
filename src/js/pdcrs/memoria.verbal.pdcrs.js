;
(function () {

    angular.module(CONSTANTS.APP).factory('MemoriaVerbalImediataPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Memória Verbal Imediata (0-12)');

        objeto.predito = function () {
            return 10.816 + (0.0561 * (DadosPaciente.getIdade() - 58.9)) - (0.0009 * DadosPaciente.getIdade() * DadosPaciente.getIdade()) + (0.1643 * DadosPaciente.getEscolaridade());
        };

        objeto.variaveis = {
            z: 1.932,
        };

        return objeto;

    }

})();