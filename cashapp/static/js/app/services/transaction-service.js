(function (angular) {
    function TransactionService ($http) {
        var baseUrl = '/api/cmn/transaction/';

        /**
         * Create transaction method
         * @param type
         * @param transaction
         * @returns {*}
         */
        function _create(type, transaction) {
            return $http.post(baseUrl + type + '/', transaction);
        }
        
        return {
            /**
             * Create income transaction
             */
            createIncomeTransaction: function (transaction) {
                return _create('income', transaction);
            }
        }
    }

    TransactionService.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$TransactionService', TransactionService)

})(angular);
