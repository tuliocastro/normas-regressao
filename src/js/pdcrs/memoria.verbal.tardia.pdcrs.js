;
(function () {

    angular.module(CONSTANTS.APP).factory('MemoriaVerbalTardiaPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Memória Verbal Tardia (0-12)');

        objeto.predito = function () {
            return 7.44 + (0.0787 * (DadosPaciente.getIdade() - 58.9)) - (0.0012 * Math.pow(DadosPaciente.getIdade(),2)) + (0.1818 * DadosPaciente.getEscolaridade()) + (0.5863 * DadosPaciente.getSexo());
        };

        objeto.variaveis = {
            z: 2.32,
        };

        return objeto;

    }

})();