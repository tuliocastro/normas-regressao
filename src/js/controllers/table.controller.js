(function () {

    angular.module(CONSTANTS.APP).controller('TableCtrl', Controller);

    function Controller(DadosPaciente, MemoriaVerbalImediataPDCRS, TotalPDCRS, NomeacaoPDCRS, AtencaoPDCRS, MemoriaTrabalhoPDCRS,
        DesenhoRelogioPDCRS, MemoriaVerbalTardiaPDCRS, FluenciaAlternadaPDCRS, FluenciaAcoesPDCRS, EscoreFrontalSubcortical, CorticalPosterior, CopiaRelogio) {

        var ctrl = this;

        var items = [
            MemoriaVerbalImediataPDCRS,
            NomeacaoPDCRS,
            AtencaoPDCRS,
            MemoriaTrabalhoPDCRS,
            DesenhoRelogioPDCRS,
            CopiaRelogio,
            MemoriaVerbalTardiaPDCRS,
            FluenciaAlternadaPDCRS,
            FluenciaAcoesPDCRS,
            EscoreFrontalSubcortical,
            CorticalPosterior,
            TotalPDCRS];

        ctrl.items = items;

        ctrl.dadosPaciente = DadosPaciente;

    }

})();