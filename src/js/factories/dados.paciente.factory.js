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