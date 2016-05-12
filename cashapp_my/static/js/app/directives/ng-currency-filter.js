(function (angular) {
    /**
     * Add sided currency sign to the value
     * @returns {Function}
     */
    function ngCurrencyFilter ($filter) {
        return function (value, code, decValue) {
            value = value || '-';
            if (code && decValue) {
                var sign = $filter('decUnicode')(decValue);
                if (code === 'EUR' || code === 'USD') {
                    return sign + ' ' + value;
                } else {
                    return value + ' ' + sign;
                }
            }
        }
    }

    ngCurrencyFilter.inject = ['$filter'];

    angular
        .module('CashAppMy')
        .filter('ngCurrency', ngCurrencyFilter)

})(angular);

