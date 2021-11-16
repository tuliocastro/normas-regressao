;
(function () {

    const INITIAL_ROUTE = "table";

    window.CONSTANTS = {
        APP: 'app',
        EMPTY_TEMPLATE: '<ui-view />'
    };

    angular.module(CONSTANTS.APP, [
        'ui.router',
    ]);

    angular.module(CONSTANTS.APP).config(function ($urlRouterProvider, $httpProvider) {

        //Default Route
        $urlRouterProvider.otherwise(INITIAL_ROUTE);

    });

    angular.module(CONSTANTS.APP).run(function ($rootScope, $state, GlobalConstants) {

        $rootScope.constants = GlobalConstants;

    });

})();
;
(function () {

    angular.module(CONSTANTS.APP).constant('GlobalConstants', {
        EMPTY_TEMPLATE: '<div ui-view />',
        APP_NAME: "NORMAS BASEADAS EM REGRESSÃO BAYESIANA"

    });

})();
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
;
(function () {

    angular.module(CONSTANTS.APP).factory('DadosPaciente', Factory);

    function Factory() {

        return {
            idade: 45,
            escolaridade: 12,
            sexo: "1",
            getIdade: function () {
                return this.idade;
            },
            getSexo: function(){
                return +this.sexo;
            },
            getEscolaridade: function () {
                return this.escolaridade;
            }
        }

    }

})();
;
(function () {

    angular.module(CONSTANTS.APP).factory('Math', Factory);

    function Factory() {

        function cdf(x, mean, variance) {
            return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
        }

        function erf(x) {
            // save the sign of x
            var sign = (x >= 0) ? 1 : -1;
            x = Math.abs(x);

            // constants
            var a1 = 0.254829592;
            var a2 = -0.284496736;
            var a3 = 1.421413741;
            var a4 = -1.453152027;
            var a5 = 1.061405429;
            var p = 0.3275911;

            // A&S formula 7.1.26
            var t = 1.0 / (1.0 + p * x);
            var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
            return sign * y; // erf(-x) = -erf(x);
        }


        return {

            distribuicaoNormalPadrao: function (x) {

                return cdf(x, 0, 1);

            }

        }

    }

})();
;
(function () {

    angular.module(CONSTANTS.APP).factory('PDCRS', Factory);

    function Factory(Math) {

        var calcularPercentil = function (percentil) {
            if (percentil < 9.13) {
                return 'INFERIOR';
            }

            if (percentil < 25.3) {
                return 'MEDIO_INFERIOR';
            }

            if (percentil < 74.8) {
                return 'MEDIO';
            }

            if (percentil < 90.9) {
                return 'SUPERIOR';
            }

            return 'MUITO_SUPERIOR';
        };

        var clazz = {

            nome: '',
            escore: 0,
            variaveis: {
                z: null,
                zInf: null,
                zSup: null,
                cutOff: null,
                cutOffInf: null,
                cutOffSup: null
            },
            setEscore: function (valor) {
                this.escore = valor;
                return this;
            },
            predito: function () {
                throw "FUNCAO DEVE SER IMPLEMENTADA";
            },
            z: function () {
                return (this.escore - this.predito()) / this.variaveis.z;
            },
            zInf: function () {
                return (this.escore - this.predito()) / this.variaveis.zInf;
            },
            zSup: function () {
                return (this.escore - this.predito()) / this.variaveis.zSup;
            },
            t: function () {
                return (10 * this.z()) + 50;
            },
            tInf: function () {
                return (10 * this.zInf()) + 50;
            },
            tSup: function () {
                return (10 * this.zSup()) + 50;
            },
            percentil: function () {
                return Math.distribuicaoNormalPadrao(this.z()) * 100;
            },
            percentilInf: function () {
                return Math.distribuicaoNormalPadrao(this.zInf()) * 100;
            },
            percentilSup: function () {
                return Math.distribuicaoNormalPadrao(this.zSup()) * 100;
            },
            classificacao: function () {

                var percentil = this.percentil();

                return calcularPercentil(percentil);
            },
            classificacaoInf: function () {

                var percentilInferior = this.percentilInf();

                return calcularPercentil(percentilInferior);
            },
            classificacaoSup: function () {

                var percentilSuperior = this.percentilSup();

                return calcularPercentil(percentilSuperior);

            },
            cutOff: function () {

                return this.variaveis.cutOff + this.predito();

            },
            cutOffInf: function () {

                return this.variaveis.cutOffInf + this.predito();

            },
            cutOffSup: function () {

                return this.variaveis.cutOffSup + this.predito();

            }

        };

        return {

            novo: function (nome) {

                var object = angular.extend({}, clazz);
                object.nome = nome;
                return object;
            }

        }

    }

})();
const classificacoesEnum = {
    'INFERIOR': "Inferior",
    'MEDIO_INFERIOR': "Médio Inferior",
    'MEDIO': "Médio",
    'SUPERIOR': "Superior",
    'MUITO_SUPERIOR': "Muito Superior",
    'INDEFINIDO': "Indefinido"
};

(function () {

    angular.module(CONSTANTS.APP).filter('classificacao', Filter);

    function Filter() {

        return function (input) {

            return classificacoesEnum[input];
        }

    }

})();
;
(function () {

    angular.module(CONSTANTS.APP).factory('AtencaoPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Atenção (0-10)');

        objeto.predito = function () {
            return 5.4178 - (0.0002 * Math.pow(DadosPaciente.getIdade(),2)) + (0.945 * Math.sqrt(DadosPaciente.getEscolaridade(),2));
        };

        objeto.variaveis = {
            z: 2.023,
        };

        return objeto;

    }

})();
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
;
(function () {

    angular.module(CONSTANTS.APP).factory('FluenciaAcoesPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Fluência de Ações (0-30)');

        objeto.predito = function () {
            return 8.962 - (0.0004 * Math.pow(DadosPaciente.getIdade(), 2)) + (0.4709 * DadosPaciente.getEscolaridade());
        };

        objeto.variaveis = {
            z: 4.374,
        };

        return objeto;

    }

})();
;
(function () {

    angular.module(CONSTANTS.APP).factory('FluenciaAlternadaPDCRS', Factory);

    function Factory(PDCRS, DadosPaciente) {

        var objeto = PDCRS.novo('Fluência Alternada (0-20)');

        objeto.predito = function () {
            return 6.444 - (0.0005 * Math.pow(DadosPaciente.getIdade(),2)) + (1.5205 * Math.sqrt(DadosPaciente.getEscolaridade()));
        };

        objeto.variaveis = {
            z: 3.575,
        };

        return objeto;

    }

})();
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
;
(function () {

    angular.module(CONSTANTS.APP).config(Routes);

    function Routes($stateProvider) {

        $stateProvider

            .state({
                name: 'table',
                url: '/table',
                templateUrl: "table.html",
                controller: "TableCtrl as ctrl"
            });

    }

})();