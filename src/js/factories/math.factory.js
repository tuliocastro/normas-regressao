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