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