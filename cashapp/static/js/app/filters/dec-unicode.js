(function (angular) {

    function DecUnicode() {
        /**
         * Filter function
         * @param value to change
         * @returns {string}
         */
        function filter (value) {
            var decs = value.split(',');
            return decs.map(function (dec) {
                return String.fromCharCode(Number(dec))
            }).join('');
        }

        return filter;
    }

    DecUnicode.$inject = [];

    angular
        .module('CashApp.Service')
        .filter('decUnicode', DecUnicode)

})(angular);
